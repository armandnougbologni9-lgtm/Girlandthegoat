# Tâche 04 — Sécurité et confidentialité

**Statut :** exigences et contrôles prévus; implémentation serveur en attente du choix d’hébergement et du backend.

## 1. État actuel

- Le site public est une maquette statique. Les pages ne transmettent actuellement pas de formulaire, réservation ou analytique.
- La carte affichée est une illustration provisoire; aucune carte tierce ni adresse exacte n’est chargée.
- La page d’administration dans `prototypes/admin/` est un prototype sans authentification, API ni persistance. Elle est exclue du déploiement et son avertissement `noindex` ne constitue pas une protection d’accès.
- Les coordonnées et contenus provisoires ne sont pas des données de production. Ne pas y entrer de données personnelles réelles.

## 2. Comptes et sessions d’administration

- Créer un compte individuel par personne; pas de compte partagé ni d’accès direct à la base de données.
- Accorder les permissions minimales selon les rôles approuvés; contrôler côté serveur chaque route et chaque action, pas seulement masquer les commandes dans l’interface.
- Protéger l’accès par authentification forte et MFA lorsque le fournisseur retenu le permet; prévoir révocation immédiate et récupération de compte sûre.
- Utiliser des sessions opaques et imprévisibles, transmises par cookies `Secure`, `HttpOnly` et `SameSite`; appliquer expiration d’inactivité et durée absolue côté serveur.
- Protéger les mutations authentifiées contre les requêtes intersites (CSRF) et renouveler/invalider la session après connexion, déconnexion et changements sensibles.
- Limiter les tentatives de connexion et alerter sur les événements sensibles sans verrouillage permanent pouvant être exploité pour un déni de service.

## 3. API, entrées et navigateur

- HTTPS sur toutes les routes; redirection HTTP vers HTTPS et HSTS activé seulement sur le domaine de production une fois le HTTPS confirmé.
- Valider chaque entrée côté serveur, encoder les valeurs au rendu et n’autoriser le HTML riche qu’avec une politique de nettoyage explicitement définie.
- Utiliser des requêtes paramétrées; réponses d’erreur sans traces, détails de base de données ou secrets.
- Garder une API de même origine si l’architecture le permet; si CORS est nécessaire, limiter précisément les origines, méthodes et en-têtes.
- Définir une CSP après inventaire des services réels; commencer en mode rapport/préproduction et limiter les exceptions aux fournisseurs confirmés.
- Configurer selon le déploiement les en-têtes `X-Content-Type-Options: nosniff`, `Referrer-Policy` et `frame-ancestors` dans la CSP; éviter les en-têtes obsolètes.
- Ne mettre aucun secret, identifiant d’écriture, clé privée ou jeton d’administration dans Git, HTML, CSS, JavaScript livré au navigateur ou journaux.

## 4. Médias et sauvegardes

- Restreindre les formats et tailles acceptés; vérifier le type réel du fichier, pas seulement son extension ou l’en-tête fourni par le client.
- Générer le nom de stockage côté serveur, autoriser le dépôt seulement aux rôles habilités et éviter l’exécution de fichiers déposés.
- Stocker les originaux hors du répertoire exécutable de l’application; ne publier que les variantes approuvées et optimisées.
- Chiffrer les sauvegardes en transit et au repos, limiter leurs accès et documenter leur durée de rétention.
- Préparer un export complet du contenu et des médias ainsi qu’une procédure de restauration; vérifier la restauration avant le lancement.

## 5. Registre de confidentialité

| Parcours | Données prévues | Mesure de minimisation / état |
| --- | --- | --- |
| Navigation publique | Journaux techniques éventuellement produits par l’hébergeur | Désactiver les journaux inutiles; définir accès et durée chez l’hébergeur |
| Réservation | Données recueillies par le fournisseur officiel après redirection | Ne pas collecter ni stocker les réservations dans le site; expliquer la destination externe |
| Formulaire | Nom, courriel, message | Route serveur vers boîte officielle; aucun fichier; pas de conservation applicative par défaut |
| Carte | Données potentiellement transmises à Google Maps au chargement | Charger uniquement après clic; conserver un lien d’itinéraire sans carte intégrée |
| Analytique | Non définie | Aucun script activé avant choix et revue confidentialité |
| Administration | Compte, rôle, événements de publication et de session | Comptes individuels; logs minimisés, protégés et sans secrets ni contenu des messages |
| Médias | Provenance, titulaire, autorisation et attribution | Conserver ces métadonnées dans le manifeste des assets; pas de données personnelles non nécessaires |

Avant d’activer un parcours, documenter son responsable, sa finalité, ses destinataires/sous-traitants, les données réellement reçues, sa durée de conservation, les mesures de sécurité et le canal de demande/suppression approprié. Le propriétaire du restaurant et le conseil compétent doivent valider le texte de confidentialité applicable au pays et aux fournisseurs retenus; ce document ne remplace pas un avis juridique.

## 6. Réponse aux incidents

Avant la production, désigner les contacts du restaurant et de l’hébergeur, définir le canal d’alerte, l’accès d’urgence, la rotation/révocation des secrets, l’isolation d’un compte compromis, les sauvegardes à préserver et la procédure de retour à un état sain. Conserver uniquement les journaux nécessaires à l’investigation et définir qui peut les consulter.

## 7. Critères de sécurité avant production

- Domaine servi en HTTPS; en-têtes relus sur l’environnement réellement déployé.
- Tests des permissions pour chaque rôle, y compris accès direct aux routes admin et tentatives d’accès aux brouillons via l’API publique.
- Vérifications de validation, encodage de sortie, CSRF, limites de requêtes, session, récupération de compte et dépôt média.
- Secrets configurés hors du dépôt et absents des artefacts client.
- Sauvegarde restaurée avec succès; accès à la préproduction contrôlé et indexation interdite.
- Formulaire, réservation, carte et analytique activés uniquement après validation de leur fournisseur, configuration et notice associée.
- Procédure d’incident, contacts et responsabilités documentés et vérifiés.

## 8. Dépendances et références

La sécurité effective ne peut être vérifiée ni configurée pour la production tant que le fournisseur d’hébergement, le runtime serveur, la base de données, la gestion des sessions et les services tiers ne sont pas choisis. Les points techniques ci-dessus suivent les références OWASP sur [l’authentification](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html), [la gestion des sessions](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [les uploads](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) et [les en-têtes HTTP](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html). Les protections concrètes seront adaptées au runtime et à l’hébergeur plutôt que copiées sans vérification.
