# Conception 3D — Girl & the Goat Los Angeles

**État :** direction proposée pour le prototype; modèle, dépendances et test mobile restent à réaliser.

## Périmètre

- Ajouter une seule scène interactive au hero de la page d’accueil. Elle met en valeur une table et un plat à partager, sans ajouter d’information commerciale ou de référence culturelle non approuvée.
- Garder menu, brunch, réservation, visite et coordonnées en HTML normal, utilisable sans 3D.
- Sur les autres pages, utiliser uniquement des images fixes optimisées si une illustration est utile.

## Approche technique

- Le site est actuellement composé de pages HTML, CSS et JavaScript sans framework ni chaîne de compilation.
- Pour la scène, utiliser Three.js avec JavaScript natif et Vite comme outil de développement/compilation. Ne pas introduire React ni React Three Fiber uniquement pour cette scène.
- Charger le modèle via `GLTFLoader` depuis un fichier glTF 2.0 binaire `.glb` hébergé avec le site. Garder le poster fixe en AVIF/WebP.
- Charger le code et le modèle seulement à la demande de la personne ou quand la scène est visible. Éviter la rotation automatique; proposer un contrôle de rotation et une commande de remise à zéro.
- Si WebGL est indisponible, si le modèle échoue ou si l’option de réduction des animations est activée, conserver le poster et tout le contenu HTML.

## Assets à préparer

- Modèle original `assets/3d/hero-table.glb`, avec source de travail `.blend` conservée dans `assets-source/` si Blender sert à le produire.
- Poster correspondant en AVIF ou WebP, avec texte alternatif décrivant uniquement l’illustration.
- Inventaire des sources, logiciels, droits, crédits, poids et validations dans `assets-source/asset-manifest.md`.
- Aucun modèle tiers ou texture n’est présumé libre de droits. La composition reste culinaire et abstraite jusqu’à validation des références par le restaurant.

## Dépendances et budgets

- Dépendances de production proposées : `three`; outil de compilation/développement : `vite`. `GLTFLoader` est fourni dans les addons Three.js et ne demande pas de paquet séparé.
- `@gltf-transform/cli` peut être installé comme outil de développement si le GLB a besoin d’inspection ou d’optimisation; ne pas l’installer avant d’avoir l’asset.
- Si le projet ne possède pas Node.js/npm, il faudra les installer pour Vite et les paquets. Blender est nécessaire seulement si l’équipe doit créer/modifier le modèle; un GLB autorisé peut être fourni à la place.
- Budgets provisoires à confirmer avec un premier modèle sur téléphone : GLB ≤ 5 Mo, poster ≤ 300 Ko, textures limitées et chargées depuis le fichier optimisé. Mesurer le rendu et le poids réels avant validation.

## Parcours de réalisation

1. Fournir un GLB autorisé ou produire la scène dans Blender; produire son poster et consigner les droits.
2. Confirmer la présence de Node.js/npm, puis ajouter Vite et Three.js avec un lockfile.
3. Intégrer le viewer comme enhancement isolée du hero, avec chargement à la demande, texte/poster de secours, commandes clavier et tactiles.
4. Vérifier l’affichage, le focus clavier, la réduction des animations, l’absence de WebGL, le chargement en réseau mobile et le poids final.

## Références techniques

- [Installation officielle de Three.js](https://threejs.org/manual/pages/installation.html)
- [Chargement officiel des modèles glTF/GLB avec GLTFLoader](https://threejs.org/manual/pages/loading-3d-models.html)
- [Documentation officielle de GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html)
- [Guide glTF Transform CLI](https://gltf-transform.dev/cli)
