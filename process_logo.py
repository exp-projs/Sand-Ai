from PIL import Image, ImageFilter
import numpy as np

def process_logo(input_path, output_path, orange_rgb=(255, 90, 0), lavender_rgb=(123, 120, 255)):
    img = Image.open(input_path).convert('RGBA')
    
    # Smooth the image slightly to remove texture/noise for a clean modern look
    img_smooth = img.filter(ImageFilter.GaussianBlur(radius=1.2))
    
    data = np.array(img)
    data_smooth = np.array(img_smooth)
    
    r_smooth = data_smooth[:, :, 0].astype(float)
    g_smooth = data_smooth[:, :, 1].astype(float)
    b_smooth = data_smooth[:, :, 2].astype(float)
    
    # Calculate smooth luminance
    lum_smooth = 0.299 * r_smooth + 0.587 * g_smooth + 0.114 * b_smooth
    
    # Find bounding box of non-transparent pixels from original alpha
    a = data[:, :, 3]
    y_indices, x_indices = np.where(a > 10)
    x_min, x_max = x_indices.min(), x_indices.max()
    y_min, y_max = y_indices.min(), y_indices.max()
    
    new_data = data.copy()
    
    for y in range(img.height):
        for x in range(img.width):
            pixel_a = a[y, x]
            if pixel_a > 10:
                pixel_lum = lum_smooth[y, x]
                
                # Smooth step blending factor for dark spots/lines:
                # 0.0 means completely dark/black, 1.0 means completely gradient
                if pixel_lum < 65:
                    blend_factor = 0.0
                elif pixel_lum > 115:
                    blend_factor = 1.0
                else:
                    blend_factor = (pixel_lum - 65) / 50.0
                
                # Calculate gradient factor t (0 = bottom-left/orange, 1 = top-right/lavender)
                tx = (x - x_min) / (x_max - x_min)
                ty = (y - y_min) / (y_max - y_min)
                t = (tx + (1 - ty)) / 2.0
                t = np.clip(t, 0.0, 1.0)
                
                # Target gradient color (highly vivid orange to lavender)
                grad_r = orange_rgb[0] * (1 - t) + lavender_rgb[0] * t
                grad_g = orange_rgb[1] * (1 - t) + lavender_rgb[1] * t
                grad_b = orange_rgb[2] * (1 - t) + lavender_rgb[2] * t
                
                # Blend between black/dark and gradient color
                new_r = int(10 * (1 - blend_factor) + grad_r * blend_factor)
                new_g = int(10 * (1 - blend_factor) + grad_g * blend_factor)
                new_b = int(10 * (1 - blend_factor) + grad_b * blend_factor)
                
                new_data[y, x, 0] = np.clip(new_r, 0, 255)
                new_data[y, x, 1] = np.clip(new_g, 0, 255)
                new_data[y, x, 2] = np.clip(new_b, 0, 255)
                # Preserve original anti-aliased transparency
                new_data[y, x, 3] = pixel_a
                    
    new_img = Image.fromarray(new_data)
    new_img.save(output_path)
    print("Saved logo to:", output_path)

if __name__ == "__main__":
    process_logo("public/logo.png", "public/logo_new.png")
