export interface Monument {
	ref: string; // Référence unique
	// nump: string; // Numéro du monument
	// pays: string; // Pays
	// insee: string; // Code INSEE de la commune
	edif: string; // Nom de l'édifice
	adresse: string | null; // Adresse si disponible
	com: string; // Commune
	// autp: string; // Auteur principal
	leg: string; // Légende ou description
	// datpv: string; // Date de prise de vue ou autre
	// typdoc: string; // Type de document
	video_v: string; // URL vers la vidéo ou image principale
	geoloc: {
		lon: number; // Longitude
		lat: number; // Latitude
  	} | null; // Coordonnées géographiques si disponibles
	// lbase: string; // Code de base (base patrimoine)
  	// video_p?: {
		// thumbnail: boolean; // Indique si une miniature est disponible
		// url: string; // URL de la miniature
  	// };
  	// copy: string; // Mention de copyright ou de la source
	reg_name: string; // Région
	dep_current_code: string; // Numéro de département
	dep_name: string; // Département
}
