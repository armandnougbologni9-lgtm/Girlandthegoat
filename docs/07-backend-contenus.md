# Tâche 07 — Backend et contenus

**Statut :** KennHosting est retenu comme hébergeur pour le site de test; l’objectif est d’essayer le déploiement du dépôt GitHub vers KennHosting Apps. Le projet n’est pas encore relié à un dépôt GitHub. Le runtime, le stockage des contenus et le fournisseur de notifications restent à confirmer avant tout usage réel.

## 1. Direction retenue

- Site public et espace administrateur développés sur mesure.
- WordPress n’est pas utilisé comme CMS ni comme dépendance du site.
- Aucune base de données applicative n’est prévue. Les contenus du site seront conservés dans des fichiers versionnés ou dans un stockage de fichiers fourni par l’hébergeur; le choix dépend des capacités de déploiement. Le navigateur public ne reçoit que les contenus publiés.
- Les pages existantes restent une maquette statique pendant cette phase. Elles ne doivent pas contenir de secrets ni simuler la persistance d’une administration.
- KennHosting est le fournisseur retenu. Pour l’essai, la cible envisagée est KennHosting Apps relié au dépôt GitHub; l’hébergement mutualisé cPanel ou VPS restent des solutions possibles si le test révèle une incompatibilité. Vérifier ensuite les contraintes de runtime/API, d’écriture et de persistance des fichiers, de sauvegarde/restauration et de préproduction avant tout usage réel.

## 2. Modèle de contenu

Chaque contenu éditorial possède un identifiant stable, un type, une langue (`fr` au lancement), un état, des dates de création/mise à jour et un auteur. Les états sont `draft`, `published` et `archived`. Les contenus et révisions sont conservés en fichiers, avec publication explicite; le stockage concret et la gestion des écritures concurrentes seront validés selon l’hébergement. Aucune donnée de commande ou de client n’est enregistrée dans un fichier du site.

| Type | Données principales |
| --- | --- |
| Page | slug, titre, description SEO, sections ordonnées, état de publication |
| Section | type de section, ordre, titres, texte, liens, références média |
| Élément de menu | catégorie, nom, description, prix optionnel, étiquettes/allergènes confirmés, disponibilité, ordre |
| Média | clé de stockage, variantes/formats, texte alternatif, crédit, provenance, autorisation d’usage, dimensions et poids |
| Réservation | fournisseur, URL officielle, libellé du lien, état actif/inactif |
| Coordonnées du restaurant | adresse, téléphone, courriel, horaires, URL d’itinéraire et statut de validation |
| Paramètres du site | nom, localisation, navigation, réseaux officiels et métadonnées globales |

La Galerie réutilise les éléments média autorisés. Les horaires, prix, coordonnées, disponibilités, allergènes et liens ne sont publiables qu’après confirmation par le restaurant. Les données provisoires de la maquette ne sont pas des valeurs de production.

## 3. Contrat API cible

Base proposée : `/api/v1`. Réponses JSON UTF-8, dates ISO 8601 UTC, identifiants opaques et erreurs structurées (`code`, `message`, `fieldErrors` si validation).

### API publique

- `GET /api/v1/public/site` — paramètres publics du site et navigation.
- `GET /api/v1/public/pages/{slug}` — page publiée seulement, sections ordonnées.
- `GET /api/v1/public/menu` — menu publié seulement, catégories et items disponibles.
- `GET /api/v1/public/gallery` — médias publiés et autorisés seulement.
- `GET /api/v1/public/visit` — adresse, horaires et liens validés.

Une ressource brouillon ou archivée ne peut jamais être obtenue via ces routes, même si l’identifiant est deviné. Un slug absent ou non publié renvoie `404`.

### API d’administration

- `POST /api/v1/admin/session` et `DELETE /api/v1/admin/session` — ouverture/fermeture d’une session sécurisée.
- `GET /api/v1/admin/content` — contenus et statuts visibles selon le rôle.
- `POST /api/v1/admin/content` — création d’un brouillon.
- `PATCH /api/v1/admin/content/{id}` — modification validée et versionnée.
- `POST /api/v1/admin/content/{id}/publish` — publication explicite après vérification des champs requis.
- `POST /api/v1/admin/content/{id}/archive` — archivage avec entrée d’audit.
- `POST /api/v1/admin/media` — dépôt contrôlé et création de variantes média.

Les routes `admin` exigent une session authentifiée, une autorisation par rôle et une protection CSRF si l’authentification repose sur des cookies. La prévisualisation non publiée doit être authentifiée et expirer; aucune clé de prévisualisation permanente ne se trouve dans le navigateur public.

### Notifications de commandes et demandes
- Chaque commande reçue via un fournisseur de commande officiellement confirmé déclenche un e-mail de notification vers la boîte officielle du restaurant. Le message contient seulement les détails nécessaires à son traitement; aucune donnée de paiement n’est transmise ni conservée par le site.
- Le site n’affiche pas de formulaire de commande ni de paiement tant qu’un fournisseur et son flux de notification ne sont pas choisis et testés.
- Sans base de données, l’administration ne peut pas fournir une boîte de réception persistante ni un historique fiable des commandes. La boîte e-mail officielle est donc le canal de notification de référence. Un tableau de bord qui liste les commandes nécessiterait un service externe autorisé disposant de son propre stockage.
- Les demandes de contact suivent le même principe : envoi direct vers l’adresse officielle, sans conservation applicative par défaut.

## 4. Rôles et audit

- `administrator` : comptes, rôles, configuration et contenus.
- `editor` : créer et modifier les brouillons, demander/revoir une publication selon la procédure du restaurant.
- `publisher` : publier et archiver les contenus approuvés.

Si une petite équipe cumule des responsabilités, les permissions peuvent être regroupées après validation; les actions sensibles restent nominatives. Les traces d’administration seront conservées dans le mécanisme d’audit de l’hébergeur ou du fournisseur d’e-mails; aucune boîte de notifications persistante ne sera simulée côté navigateur. Ne jamais journaliser mots de passe, jetons de session, contenu complet d’un message client ou secrets.

## 5. Médias et conservation

- Stockage privé des originaux dans le service de fichiers choisi; diffusion publique des seules variantes publiées, via URL contrôlée ou CDN du fournisseur choisi.
- Images éditoriales en WebP/AVIF avec tailles responsives; préserver une variante source autorisée pour les futures dérivations.
- Conserver pour chaque fichier sa provenance, sa licence/autorisation, son attribution, ses usages permis, son texte alternatif, ses dimensions, son poids et son approbation dans [asset-manifest.md](../assets-source/asset-manifest.md).
- Rejeter les extensions non autorisées, vérifier le type réel, limiter taille et dimensions, générer des noms non prévisibles et empêcher l’exécution de fichiers déposés.
- Le GLB et les dépendances 3D restent conditionnels aux règles médias de [TASKS.md](../TASKS.md); aucune dépendance 3D n’est requise par ce contrat.

## 6. Règles de sécurité et d’exploitation

- HTTPS uniquement; secrets dans les paramètres sécurisés de l’hébergeur.
- Validation côté serveur de chaque entrée; limites de requêtes et protection contre les abus sur connexion, dépôt et formulaire public.
- Sauvegardes chiffrées des fichiers de contenus et médias, export du contenu et procédure de restauration documentée et vérifiée avant production; aucune sauvegarde de base de données applicative n’est prévue.
- Environnements développement, préproduction protégée et production séparés; préproduction non indexable et données de démonstration sans informations personnelles réelles.
- Suppression/archivage et durées de conservation définis avant activation du formulaire; messages transmis à la boîte officielle sans stockage applicatif prolongé par défaut.
- Aucune donnée de commande, réservation ou paiement n’est stockée par le site; les réservations et commandes passent par le prestataire confirmé. La commande doit déclencher une notification e-mail à l’équipe du restaurant.

## 7. Décisions encore requises avant l’implémentation

1. Quel produit KennHosting sera utilisé (hébergement mutualisé cPanel, plateforme Apps ou VPS)? Vérifier pour ce produit le runtime/API, la persistance des fichiers hors du répertoire public, les sauvegardes/restaurations et la préproduction.
2. Quel service d’envoi d’e-mails et quelle boîte officielle recevront les notifications de commandes et messages? Qui y aura accès et combien de temps les messages seront-ils conservés?
3. Quel fournisseur de commandes en ligne est approuvé, et peut-il envoyer un événement fiable au site ou notifier directement la boîte officielle?
4. Qui, côté restaurant, aura les rôles administrateur, éditeur et approbateur de publication?
5. Quel fournisseur de réservation et quel fournisseur de stockage des médias sont officiellement approuvés?

Une fois le produit KennHosting et le fournisseur de notifications confirmés, choisir le runtime compatible, définir le format et le stockage des fichiers éditoriaux, créer les routes serveur nécessaires, puis connecter l’espace administrateur de la tâche 06. Aucune migration de base de données n’est prévue et aucune installation n’est effectuée dans cette phase de définition.
