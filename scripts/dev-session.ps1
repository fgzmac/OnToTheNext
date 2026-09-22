# Dot-source this file: . ./scripts/dev-session.ps1
# Environment changes apply only to this PowerShell session and child processes.
$developmentRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $developmentRoot
if (-not $env:CI) {
    $env:PLAYWRIGHT_BROWSERS_PATH = '0'
    $env:npm_config_cache = Join-Path $developmentRoot '.cache/npm'
    $env:TEMP = Join-Path $developmentRoot '.cache/tmp'
    $env:TMP = $env:TEMP
    $env:TMPDIR = $env:TEMP
    $env:XDG_CACHE_HOME = Join-Path $developmentRoot '.cache'
    @($env:npm_config_cache, $env:TEMP) |
        ForEach-Object { New-Item -ItemType Directory -Path $_ -Force | Out-Null }
}
Write-Host "Development session: $developmentRoot"
