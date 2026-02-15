param (
    [string]$ProjectDir = (Get-Location).Path,
    [string]$OutputFile = "context.xml"
)

$ExcludePatterns = @("node_modules", "dist", ".git", ".vscode", "package-lock.json")
$IncludeExtensions = @(".ts", ".tsx", ".js", ".jsx", ".css", ".json", ".md")

Write-Host "Collecting context from: $ProjectDir"

Set-Content -Path $OutputFile -Value "<code_context>"

Get-ChildItem -Path $ProjectDir -Recurse -File | ForEach-Object {
    $file = $_
    $relPath = $file.FullName.Substring($ProjectDir.Length + 1).Replace("\", "/")
    
    # Check Excludes
    $exclude = $false
    foreach ($pattern in $ExcludePatterns) {
        if ($relPath -like "*$pattern*") {
            $exclude = $true
            break
        }
    }

    # Check Extensions
    if (-not $exclude -and $IncludeExtensions -contains $file.Extension) {
        Add-Content -Path $OutputFile -Value "  <file path=""$relPath"">"
        
        try {
            $content = Get-Content -Path $file.FullName -Raw
            Add-Content -Path $OutputFile -Value $content
        }
        catch {
            Write-Warning "Could not read file: $($file.FullName)"
        }
        
        Add-Content -Path $OutputFile -Value "  </file>"
    }
}

Add-Content -Path $OutputFile -Value "</code_context>"

Write-Host "Context saved to: $OutputFile"
