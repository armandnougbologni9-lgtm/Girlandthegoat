"""Build the Girl & the Goat homepage tabletop study in Blender.

Run from Blender's scripting workspace. The script creates an editable .blend,
exports a self-contained GLB, and renders a PNG poster for later WebP/AVIF
conversion. All geometry and materials are original procedural placeholders.
"""

from pathlib import Path
import math
import bpy
from mathutils import Vector


PROJECT_ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = PROJECT_ROOT / "assets" / "3d"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
BLEND_PATH = OUTPUT_DIR / "hero-table.blend"
GLB_PATH = OUTPUT_DIR / "hero-table.glb"
POSTER_PATH = OUTPUT_DIR / "hero-table-poster.png"
WEBP_PATH = OUTPUT_DIR / "hero-table-poster.webp"


def material(name, color, roughness=0.72, metallic=0.0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1.0)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return mat


def assign(obj, mat):
    obj.data.materials.append(mat)
    return obj


def bevelled_cylinder(name, radius, depth, location, mat, bevel=0.04, vertices=48):
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=vertices, radius=radius, depth=depth, location=location
    )
    obj = bpy.context.object
    obj.name = name
    assign(obj, mat)
    if bevel:
        mod = obj.modifiers.new("Soft ceramic edges", "BEVEL")
        mod.width = bevel
        mod.segments = 3
        obj.modifiers.new("Weighted corner normals", "WEIGHTED_NORMAL")
    return obj


def ellipsoid(name, location, scale, mat, segments=20, rings=12):
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=segments, ring_count=rings, radius=1, location=location
    )
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    assign(obj, mat)
    bpy.ops.object.shade_smooth()
    return obj


def leaf(name, start, end, width, mat):
    mid = (Vector(start) + Vector(end)) / 2
    direction = Vector(end) - Vector(start)
    obj = ellipsoid(name, mid, (width, direction.length / 2, width * 0.17), mat, 12, 8)
    obj.rotation_euler[2] = math.atan2(direction.y, direction.x)
    obj.rotation_euler[0] = -0.13
    return obj


def rod(name, start, end, radius, mat, vertices=12):
    a, b = Vector(start), Vector(end)
    delta = b - a
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=vertices, radius=radius, depth=delta.length, location=(a + b) / 2
    )
    obj = bpy.context.object
    obj.name = name
    obj.rotation_euler = delta.to_track_quat("Z", "Y").to_euler()
    assign(obj, mat)
    return obj


# Clear the default scene and its orphaned data for a reproducible build.
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
for collection in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
    for item in list(collection):
        if item.users == 0:
            collection.remove(item)

# Palette follows the provisional site identity: linen, forest, tomato, brass.
oak = material("Table | warm walnut", (0.24, 0.14, 0.085), 0.55)
linen = material("Plate | warm ivory", (0.91, 0.86, 0.75), 0.26)
ceramic = material("Bowl | deep forest", (0.075, 0.17, 0.12), 0.24)
tomato = material("Tomato | roasted red", (0.68, 0.16, 0.075), 0.48)
gold = material("Roast | golden brown", (0.55, 0.30, 0.12), 0.72)
leaf_green = material("Herbs | garden green", (0.18, 0.31, 0.13), 0.78)
leaf_light = material("Herbs | fresh green", (0.34, 0.45, 0.19), 0.78)
charred = material("Vegetables | charred aubergine", (0.22, 0.12, 0.15), 0.65)
brass = material("Cutlery | aged brass", (0.57, 0.39, 0.18), 0.29, 0.68)

# Round table, broad enough to read as a tabletop crop in the homepage hero.
bevelled_cylinder("Tabletop", 3.55, 0.22, (0, 0, -0.36), oak, 0.08, 64)
for index, (x, y) in enumerate(((-2.25, -2.2), (2.25, -2.2), (-2.25, 2.2), (2.25, 2.2)), 1):
    bevelled_cylinder(f"Table leg {index}", 0.13, 1.55, (x, y, -1.18), oak, 0.025, 24)

# Shared platter at the centre: the plate rim, inset and raised golden food.
bevelled_cylinder("Serving platter | rim", 1.52, 0.13, (0, 0, -0.20), linen, 0.07, 64)
bevelled_cylinder("Serving platter | well", 1.30, 0.045, (0, 0, -0.105), ceramic, 0.025, 64)
bevelled_cylinder("Roasted centerpiece", 0.76, 0.20, (0.02, -0.04, 0.055), gold, 0.11, 32)

# Roasted vegetables and tomato halves arranged as a shared seasonal plate.
for i, (x, y, sx, sy) in enumerate((
    (-0.76, 0.35, 0.34, 0.22), (-0.28, 0.68, 0.30, 0.21),
    (0.40, 0.58, 0.35, 0.22), (0.82, 0.13, 0.30, 0.20),
    (0.62, -0.48, 0.35, 0.19), (-0.45, -0.63, 0.38, 0.20),
)):
    veg = ellipsoid(f"Roasted vegetable {i + 1}", (x, y, 0.14), (sx, sy, 0.17), charred, 16, 10)
    veg.rotation_euler[2] = i * 0.73

for i, (x, y) in enumerate(((-0.77, -0.08), (-0.48, 0.89), (0.74, 0.39), (0.32, -0.82))):
    ellipsoid(f"Tomato half {i + 1}", (x, y, 0.19), (0.20, 0.17, 0.13), tomato, 16, 10)

# Small herb leaves add a restrained, legible green accent to the platter.
for i, (x, y, dx, dy) in enumerate((
    (-0.36, 0.12, -0.17, 0.25), (-0.14, 0.26, 0.15, 0.24),
    (0.10, 0.04, 0.22, -0.10), (0.32, -0.12, 0.19, -0.22),
    (-0.09, -0.30, -0.20, -0.11),
)):
    leaf(f"Herb leaf {i + 1}", (x, y, 0.27), (x + dx, y + dy, 0.31), 0.095,
         leaf_green if i % 2 else leaf_light)

# Two small side plates frame the shared dish without crowding the scene.
for index, (x, y) in enumerate(((-2.05, 0.45), (2.02, -0.55)), 1):
    bevelled_cylinder(f"Side plate {index}", 0.74, 0.09, (x, y, -0.20), linen, 0.04, 48)
    bevelled_cylinder(f"Side plate well {index}", 0.62, 0.025, (x, y, -0.135), ceramic, 0.015, 48)
    ellipsoid(f"Bread portion {index}", (x - 0.04, y + 0.02, -0.035), (0.33, 0.22, 0.12), gold, 16, 8)

# Simple brass cutlery; keep the silhouette clear at thumbnail scale.
for side, x in (("left", -2.78), ("right", 2.75)):
    rod(f"Fork handle {side}", (x, -1.02, -0.04), (x, -0.05, -0.04), 0.035, brass)
    rod(f"Spoon handle {side}", (x + 0.24, -1.02, -0.04), (x + 0.24, -0.05, -0.04), 0.035, brass)
    ellipsoid(f"Spoon bowl {side}", (x + 0.24, 0.09, -0.025), (0.105, 0.15, 0.04), brass, 16, 8)
    for tine in range(4):
        tx = x - 0.105 + tine * 0.07
        rod(f"Fork tine {side} {tine + 1}", (tx, -0.02, -0.04), (tx, 0.22, -0.04), 0.018, brass, 8)

# Organize exportable objects and remove render-only data from the GLB.
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = 16
scene.cycles.use_denoising = True
scene.render.resolution_x = 1200
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.film_transparent = True
scene.render.filepath = str(POSTER_PATH)
bpy.ops.object.camera_add(location=(5.9, -7.4, 8.3))
camera = bpy.context.object
camera.name = "Poster camera"
camera.rotation_euler = (Vector((0, 0, -0.05)) - camera.location).to_track_quat("-Z", "Y").to_euler()
camera.data.type = "ORTHO"
camera.data.ortho_scale = 8.6
scene.camera = camera

for name, location, energy, size in (
    ("Key softbox", (0.5, -3.0, 7.5), 950, 5.0),
    ("Fill softbox", (-4.0, 1.5, 4.5), 520, 4.0),
    ("Rim softbox", (3.5, 4.0, 5.0), 700, 3.0),
):
    bpy.ops.object.light_add(type="AREA", location=location)
    light = bpy.context.object
    light.name = name
    light.data.energy = energy
    light.data.shape = "DISK"
    light.data.size = size
    light.rotation_euler = (Vector((0, 0, 0)) - light.location).to_track_quat("-Z", "Y").to_euler()

scene.world.color = (0.22, 0.22, 0.22)
scene.render.image_settings.color_mode = "RGBA"
scene.view_settings.view_transform = "AgX"

# Save the editable source with camera, lights, materials and full mesh scene.
bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_PATH))

# Render a transparent PNG source and an optimized WebP for the website.
bpy.ops.render.render(write_still=True)
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.color_mode = "RGBA"
scene.render.image_settings.quality = 84
bpy.data.images["Render Result"].save_render(str(WEBP_PATH), scene=scene)

# Export only modeled mesh objects; the web renderer supplies its own lighting.
bpy.ops.object.select_all(action="DESELECT")
for obj in scene.objects:
    if obj.type == "MESH":
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
bpy.ops.export_scene.gltf(
    filepath=str(GLB_PATH),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_materials="EXPORT",
    export_cameras=False,
    export_lights=False,
)

print(f"Created editable source: {BLEND_PATH}")
print(f"Created GLB asset: {GLB_PATH}")
print(f"Created PNG source poster: {POSTER_PATH}")
print(f"Created optimized WebP poster: {WEBP_PATH}")
