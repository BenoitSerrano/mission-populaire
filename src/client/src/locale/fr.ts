const fr = {
    shared: {
        close: 'Fermer',
        dashboardMenu: {
            items: {
                missions: 'Missions',
            },
        },
    },

    adUpsertion: {
        addTitle: 'Créer une annonce',
        editTitle: 'Éditer une annonce',
        form: {
            title: 'Titre',
            description: 'Description',
            deadline: {
                date: 'La mission doit se terminer avant le',
                time: 'à',
            },
            requiredSkills: { title: 'Compétence(s) nécessaire(s)', add: 'Ajouter une compétence' },
        },
    },
    application: {
        pick: 'Choisir',
        appliedAt: 'Postulé le {{appliedAt}}',
        applicationStatusTitle: {
            declined: 'Candidature refusée',
            accepted: 'Candidature acceptée',
            pending: "Candidature en cours d'examen",
        },
    },
    ads: {
        createAd: 'Créer une annonce',
        adsTable: {
            publishedOn: 'Publié le {{publishedOn}}',
            missionStatusTitle: {
                open: 'En recherche de candidat.e',
                filled: 'Pourvue',
                completed: 'Terminée',
            },
        },
    },
};

export { fr };
