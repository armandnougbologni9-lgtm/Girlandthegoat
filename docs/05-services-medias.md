# Tâche 05 — Services et médias

**Statut :** préparation des contrats d’intégration; services réels en attente des informations et validations listées ci-dessous.

## Réservation

- Utiliser uniquement le fournisseur et l’URL de réservation officiels communiqués par le restaurant.
- Ouvrir le site du fournisseur dans une nouvelle page avec les attributs de sécurité adaptés; annoncer clairement la destination externe au visiteur.
- Tant que le fournisseur n’est pas approuvé, garder le parcours visible comme indisponible et ne pas afficher de disponibilité, horaires ou prix inventés.
- Ne stocker aucune donnée de réservation ni de paiement dans le site.

**À fournir :** nom du prestataire, URL de production, règles de liens et parcours de secours (téléphone/courriel officiel si approuvé).

## Formulaire de contact

- Champs prévus : nom, courriel et message uniquement; aucun téléversement de pièce jointe.
- Envoyer depuis une route serveur vers la boîte officielle; ne jamais inclure les secrets d’envoi dans le JavaScript navigateur.
- Valider et limiter les entrées côté serveur, limiter les envois, ajouter une protection anti-abus accessible et fournir des états de réussite/erreur compréhensibles.
- Ne conserver aucun message dans la base applicative par défaut. Si une conservation temporaire est requise, en préciser le motif, la durée, les personnes autorisées et la suppression.
- Présenter l’information de confidentialité au moment de l’envoi et recueillir uniquement les données utiles au traitement demandé.

**À fournir :** boîte destinataire, expéditeur vérifié, fournisseur de courriel approuvé, durée de conservation, contact responsable et procédure anti-spam compatible avec le fournisseur.

## Carte et itinéraire

- Garder un lien d’itinéraire utilisable sans JavaScript ni carte intégrée.
- Le projet retient Google Maps comme option cartographique, mais ne chargera le contenu tiers qu’après une action explicite du visiteur.
- Avant le clic, montrer une carte de remplacement et un libellé qui explique le chargement du service externe.
- Respecter la réduction de mouvement, le clavier, les dimensions mobiles et les informations essentielles en HTML.

**À fournir :** adresse exacte vérifiée, URL d’itinéraire, configuration et clé/API adaptées au domaine, responsabilités de facturation et revue de confidentialité.

## Analytique

- Aucune analytique ni balise publicitaire n’est active à ce stade.
- Comparer des options sans suivi publicitaire ni profilage; limiter les événements aux mesures utiles du site.
- Documenter les données collectées, la durée de conservation, les sous-traitants, les transferts et l’éventuel mécanisme de consentement avant activation.
- Ne pas charger de script analytique tant que l’outil et la configuration de confidentialité n’ont pas été approuvés.

**À fournir :** approbation du responsable, outil choisi, paramètres de conservation, catégories d’événements et validation juridique/confidentialité appropriée.

## Images et médias

- N’intégrer que des fichiers répertoriés dans [asset-manifest.md](../assets-source/asset-manifest.md) avec provenance, titulaire des droits, licence/autorisation, attribution, usages permis et approbation.
- Produire des variantes responsives WebP/AVIF; garder une source autorisée, inclure dimensions et attributs `width`/`height`, texte alternatif pertinent et chargement différé pour les images hors écran.
- Réserver le chargement prioritaire au visuel principal réellement affiché au premier écran; éviter le chargement différé de ce visuel.
- Une image sans information utile est décorative avec un texte alternatif vide; ne pas répéter le texte déjà adjacent.
- La 3D interactive demeure conditionnelle; ne pas ajouter de dépendance ni de fichier GLB sans décision explicite, gain démontré, repli poster/HTML et contrôle mobile/accessibilité.

## Ordre de mise en œuvre quand les éléments seront reçus

1. Confirmer les fournisseurs et les informations opérationnelles avec le restaurant.
2. Valider la confidentialité, les conditions d’utilisation, les responsables de traitement et les durées de conservation pertinentes.
3. Implémenter chaque intégration côté serveur lorsque des secrets sont requis; charger la carte après interaction et maintenir les liens sans JavaScript.
4. Tester les états normaux, erreurs fournisseur, réseau lent, clavier, mobile, refus des services externes et désactivation des scripts tiers.
5. Enregistrer chaque média et faire approuver la préproduction avant l’activation en production.

## Installation

Aucune installation n’est requise pour documenter les intégrations. Les dépendances du service de courriel, du runtime serveur, de la carte ou de l’analytique seront sélectionnées après le choix d’hébergement et de fournisseurs; les ajouter seulement si l’intégration retenue le nécessite.
