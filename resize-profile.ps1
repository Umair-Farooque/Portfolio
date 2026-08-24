Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Image]::FromFile('d:\Portfolio\public\profile.jpg')
Write-Host "Original: $($img.Width) x $($img.Height)"

$bmp = New-Object System.Drawing.Bitmap(112, 112)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$scale = 112 / [Math]::Min($img.Width, $img.Height)
$sw = [int](112 / $scale)
$sh = [int](112 / $scale)
$sx = [int](($img.Width - $sw) / 2)
$sy = 0

# DrawImage(source, destRect, srcRect, graphicsUnit)
$destRect = New-Object System.Drawing.Rectangle(0, 0, 112, 112)
$srcRect = New-Object System.Drawing.Rectangle($sx, $sy, $sw, $sh)
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$tempPath = 'd:\Portfolio\public\profile_optimized.jpg'
$bmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
Write-Host "Saved to profile_optimized.jpg"

$g.Dispose()
$bmp.Dispose()
$img.Dispose()

Write-Host "Resized to 112x112"