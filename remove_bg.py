"""
High-quality white background removal for mon.png
Uses FLOOD FILL from edges so only the OUTER background is removed.
White areas inside the monitor screen are preserved.
"""
from PIL import Image, ImageFilter, ImageDraw
import numpy as np
from collections import deque

def is_white_like(r, g, b, threshold=230):
    """Check if a pixel is white/near-white."""
    return r >= threshold and g >= threshold and b >= threshold

def flood_fill_from_edges(img_array, threshold=230):
    """
    Flood fill from all edge pixels to find connected white regions
    that touch the border of the image. Only these outer white areas
    will be made transparent.
    
    Returns a boolean mask where True = pixel should be made transparent.
    """
    h, w = img_array.shape[:2]
    visited = np.zeros((h, w), dtype=bool)
    to_remove = np.zeros((h, w), dtype=bool)
    
    queue = deque()
    
    # Add all edge pixels that are white-like to the queue
    # Top and bottom edges
    for x in range(w):
        for y in [0, h - 1]:
            r, g, b = img_array[y, x, 0], img_array[y, x, 1], img_array[y, x, 2]
            if is_white_like(r, g, b, threshold) and not visited[y, x]:
                visited[y, x] = True
                to_remove[y, x] = True
                queue.append((x, y))
    
    # Left and right edges
    for y in range(h):
        for x in [0, w - 1]:
            r, g, b = img_array[y, x, 0], img_array[y, x, 1], img_array[y, x, 2]
            if is_white_like(r, g, b, threshold) and not visited[y, x]:
                visited[y, x] = True
                to_remove[y, x] = True
                queue.append((x, y))
    
    # BFS flood fill
    while queue:
        x, y = queue.popleft()
        
        # Check 4-connected neighbors
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny, nx]:
                visited[ny, nx] = True
                r = img_array[ny, nx, 0]
                g = img_array[ny, nx, 1]
                b = img_array[ny, nx, 2]
                if is_white_like(r, g, b, threshold):
                    to_remove[ny, nx] = True
                    queue.append((nx, ny))
    
    return to_remove

def remove_outer_background(input_path, output_path, threshold=230):
    """
    Remove only the OUTER white background (connected to image edges).
    White areas inside the monitor screen remain untouched.
    """
    # Load image
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Step 1: Restore full opacity first (in case previous run damaged alpha)
    data[:, :, 3] = 255
    
    # Step 2: Flood fill from edges to find outer white background
    print("Finding outer background with flood fill...")
    outer_mask = flood_fill_from_edges(data, threshold=threshold)
    
    # Step 3: Create smooth alpha transitions at the edges
    # Convert mask to float for processing
    alpha_mask = np.where(outer_mask, 0.0, 255.0)
    
    # Create a slightly expanded border zone for anti-aliasing
    mask_img = Image.fromarray(alpha_mask.astype(np.uint8), mode='L')
    
    # Smooth the edges slightly for anti-aliasing
    mask_smooth = mask_img.filter(ImageFilter.GaussianBlur(radius=1.0))
    alpha_smooth = np.array(mask_smooth, dtype=np.float64)
    
    # Keep the core areas sharp - only smooth the transition zone
    alpha_original = np.array(mask_img, dtype=np.float64)
    
    # Identify edge pixels (transition zone)
    edge_zone = (alpha_original > 5) & (alpha_original < 250)
    
    # Dilate edge zone slightly
    edge_img = Image.fromarray((edge_zone.astype(np.uint8)) * 255)
    edge_dilated = edge_img.filter(ImageFilter.MaxFilter(size=3))
    edge_expanded = np.array(edge_dilated, dtype=np.float64) / 255.0
    
    # Blend: sharp in core areas, smooth at edges
    final_alpha = alpha_original * (1 - edge_expanded) + alpha_smooth * edge_expanded
    final_alpha = np.clip(final_alpha, 0, 255).astype(np.uint8)
    
    # Step 4: Apply alpha to image
    data[:, :, 3] = final_alpha
    
    # Step 5: Save result
    result = Image.fromarray(data, "RGBA")
    result.save(output_path, "PNG", optimize=False)
    
    # Stats
    total_pixels = outer_mask.size
    removed_pixels = np.sum(outer_mask)
    print(f"Background removed successfully!")
    print(f"Removed {removed_pixels:,} / {total_pixels:,} pixels ({removed_pixels/total_pixels*100:.1f}%)")
    print(f"Image dimensions: {img.size[0]}x{img.size[1]}")
    print(f"Output saved to: {output_path}")

if __name__ == "__main__":
    input_file = r"c:\laragon\www\portofolio\public\images\monn.png"
    output_file = r"c:\laragon\www\portofolio\public\images\monn.png"
    
    remove_outer_background(input_file, output_file, threshold=230)
