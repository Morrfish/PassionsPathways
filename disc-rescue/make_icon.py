"""Makes the app's icons from the logo in branding/:
  icon.ico               the .exe and taskbar icon (the shield)
  discrescue/icon.png    the window-corner icon (the shield)
  discrescue/logo.png    the banner at the top of the window (shield + name)
"""
from PIL import Image

shield = Image.open("branding/shield.png").convert("RGBA")
shield.save("icon.ico", sizes=[(16, 16), (20, 20), (24, 24), (32, 32), (40, 40),
                               (48, 48), (64, 64), (128, 128), (256, 256)])
shield.resize((128, 128), Image.LANCZOS).save("discrescue/icon.png", optimize=True)

logo = Image.open("branding/logo-full.png").convert("RGBA")
logo.thumbnail((800, 140), Image.LANCZOS)   # 2x the banner size, for sharp scaling
logo.save("discrescue/logo.png", optimize=True)
