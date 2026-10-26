# Plan du projet — Girl & the Goat

Les tâches sont ordonnées de **09 à 01**, de la première base de travail jusqu’au déploiement final. Le statut distingue l’ébauche locale de la validation et de la mise en production. **Priorité confirmée :** reprendre les tâches restantes des sections **09 à 04**. Les tâches **03, 02 et 01** restent en attente jusqu’à nouvelle décision.

| Tâche | Travail | Statut |
| --- | --- | --- |
| **09 — Fondation visuelle** | Poser l’identité visuelle provisoire, la navigation responsive et la première page d’accueil. Utiliser des illustrations/images fixes optimisées; réserver une scène 3D interactive au hero d’accueil, avec poster et repli accessible. Garder les informations métier non confirmées clairement signalées. | En cours — portée 3D définie à une scène d’accueil; modèle, outil de compilation, intégration et droits à traiter |
| **08 — Pages du site** | Construire Accueil, À propos, Menu, Brunch, Réservations, Galerie et Contact & localisation avec composants réutilisables. | En cours — première version locale créée; contenu et visuels à valider |
| **07 — Backend et contenus** | Choisir l’hébergement et la technologie; définir l’API, les données, les médias, les brouillons et les contenus publiés. | En cours — KennHosting retenu; essai visé : GitHub → KennHosting Apps; dépôt distant et connexion GitHub à établir; sans base de données |
| **06 — Administration personnalisée** | Créer connexion, tableau de bord, formulaires de contenu, aperçu et publication pour les rôles convenus; refléter le canal e-mail des commandes sans simuler une boîte de réception persistante. | En cours — maquette locale mise à jour; connexion et notifications actives attendent l’hébergement et les fournisseurs de la tâche 07 |
| **05 — Services et médias** | Brancher réservation, formulaire, carte et analytique; intégrer les images autorisées et optimisées. Préparer une scène 3D interactive isolée sur l’accueil après validation de son coût mobile, de son modèle et de son intégration accessible. | Préparation en cours — concept 3D défini; GLB, dépendances/outils, hébergement et vérification mobile à réaliser |
| **04 — Sécurité et confidentialité** | Protéger les comptes, API et médias; limiter les données; définir sauvegardes, conservation et réponse aux incidents. | En cours — exigences consignées; mise en œuvre liée au backend et à l’hébergement |
| **03 — Qualité du site** | Finaliser accessibilité, responsive, SEO, performance, compatibilité et critères de réception. | À faire |
| **02 — Préproduction et validation** | Déployer en préproduction, tester les parcours et l’administration, corriger les défauts, obtenir l’approbation du restaurant. | À faire |
| **01 — Production et remise** | Déployer le site, vérifier les services réels, remettre les accès et documenter maintenance et support. | En attente de validation |

## Conditions avant publication

- Le restaurant a confirmé textes, horaires, adresse, menus, prix, visuels et droits.
- L’URL de réservation et les coordonnées officielles sont configurées et vérifiées.
- L’espace administrateur, les permissions, les sauvegardes et la restauration ont été validés.
- Le responsable du restaurant a approuvé la préproduction et autorisé la mise en ligne.

Le site est désormais prévu en français uniquement. WordPress est exclu. Aucune disponibilité fictive, donnée commerciale non confirmée ou coordonnée provisoire ne doit être publiée.

## Règles visuelles et médias

- Privilégier des images fixes éditoriales optimisées en WebP/AVIF. Une scène interactive 3D reste limitée à un moment marquant et nécessite une décision explicite.
- Pour une scène interactive, livrer un GLB optimisé, charger le moteur seulement lorsque nécessaire et fournir une image poster ainsi qu’un contenu HTML compréhensible sans WebGL.
- Les informations essentielles restent en HTML; prévoir clavier, réduction des animations, repli en cas d’échec et vérification sur mobile.
- Enregistrer provenance, créateur, licence/autorisation, attribution, usages permis, poids/dimensions, emplacement et validation de chaque asset dans [asset-manifest.md](assets-source/asset-manifest.md).
- Ne pas installer de dépendances 3D avant le choix du framework et la confirmation qu’une scène interactive est retenue. Les outils d’optimisation de modèles sont des outils de développement, à ajouter seulement si nécessaires.

## Travail restant sur les tâches 09, 08 et 07

Ces trois tâches ont une première base de travail; elles ne sont pas considérées comme validées ni terminées.

### 09 — Fondation visuelle

- Faire approuver la direction visuelle, la typographie, les couleurs et les composants par le responsable du restaurant.
- Les pages utilisent maintenant des photos du site officiel comme références visuelles locales. Obtenir l’autorisation de réutilisation et les crédits des photographes; ensuite récupérer des copies autorisées, optimiser les variantes locales et compléter [asset-manifest.md](assets-source/asset-manifest.md). Ne pas publier les liens CDN provisoires tant que les droits ne sont pas établis.
- Revoir les rendus petit écran, clavier, contraste, réduction des animations et performance avec les vrais contenus et médias.
- Pour la proposition 3D limitée au hero d’accueil, préparer un GLB original ou autorisé et son poster; installer seulement Node.js/npm, Vite et Three.js nécessaires à l’intégration, puis vérifier le repli sans WebGL et le chargement mobile. Suivre [09-conception-3d.md](docs/09-conception-3d.md).

### 08 — Pages du site

- Obtenir et intégrer les textes officiels pour Accueil, À propos, Menu, Brunch, Réservations, Galerie et Contact/localisation.
- Confirmer plats, prix, allergènes, jours/heures, adresse, téléphone, courriel, liens sociaux, URL de réservation et statut de brunch avant publication.
- Remplacer les visuels d’attente, vérifier les liens et parcourir les pages avec le restaurant; finaliser SEO, accessibilité et affichage responsive.

### 07 — Backend et contenus

- KennHosting est retenu comme hébergeur; essayer GitHub → KennHosting Apps pour le site de test. Créer/relier le dépôt distant puis vérifier le déploiement. Avant tout usage réel, confirmer le runtime, la persistance et protection du stockage fichiers, la préproduction, les sauvegardes/restaurations et les fournisseurs de notification.
- Valider les rôles de l’équipe, l’adresse destinataire des messages et leur durée de conservation, ainsi que les fournisseurs de réservation et de médias.
- Choisir le runtime et la base selon l’hébergement, puis implémenter migrations, API publique/admin, aperçu authentifié, publication/révisions, dépôt média et sauvegardes.
- Vérifier qu’aucun brouillon, secret ou média non autorisé ne peut être servi publiquement.

### Dépendances entre tâches

- La maquette du 06 sert à valider les parcours d’administration; elle ne remplace pas l’authentification, l’API ni le stockage.
- L’implémentation fonctionnelle du 06 dépend du choix d’hébergement et du socle backend défini au 07.
- La validation finale des tâches 09 et 08 dépend des textes, médias et données officiels fournis par le restaurant.
- Le formulaire, la réservation, la carte et l’analytique restent inactifs tant que les responsables, fournisseurs et informations de confidentialité ne sont pas confirmés; voir [05-services-medias.md](docs/05-services-medias.md).
- Les exigences de sécurité et le registre des données à documenter avant activation sont consignés dans [04-securite-confidentialite.md](docs/04-securite-confidentialite.md).

## Cible photo — identité visuelle (validée)

- **24 photos différentes** réparties dans **35 emplacements** sur le site; une photo réutilisée sur plusieurs pages ne compte qu’une fois parmi les 24.
- Répartition des emplacements : Accueil 5, À propos 3, Menu 10, Brunch 5, Réservations 2, Galerie 8, Contact & localisation 2.
- Les photos repérées sur le site officiel sont des références de conception. Avant toute publication : confirmer les droits de reproduction, les crédits, et les usages permis; enregistrer les informations dans [asset-manifest.md](assets-source/asset-manifest.md).
- Répartition intégrée et comptée dans les pages : **35 photos affichées dans 35 emplacements, pour 24 images différentes**. Le lot comprend 6 photos officielles conservées comme références de maquette, 18 photos Unsplash illustratives et des réutilisations entre pages. Les 7 candidates officielles supplémentaires restent consignées au registre comme options de remplacement.
- Prévoir des visuels cohérents et soignés pour les plats, boissons, brunch, équipe, salle, patio et détails d’ambiance. Optimiser et servir en formats adaptés au web après validation des droits.
