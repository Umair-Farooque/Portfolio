from PIL import Image, ImageDraw, ImageOps
import os

def make_circle(img_path):
    # Open the image
    img = Image.open(img_path).convert("RGBA")
    
    # Square the image
    size = min(img.size)
    img = ImageOps.fit(img, (size, size), centering=(0.5, 0.5))
    
    # Create mask
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    # Apply mask
    output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    output.paste(img, (0, 0), mask=mask)
    
    # Save output
    output.save(img_path)
    print(f"Successfully rounded {img_path}")

if __name__ == "__main__":
    icon_path = r"c:\Users\umair\Downloads\integrate-animated-hero-component\public\ArcSirius AI.png"
    if os.path.exists(icon_path):
        make_circle(icon_path)
    else:
        print("Icon not found.")
