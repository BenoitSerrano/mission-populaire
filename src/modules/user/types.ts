const SKILL_LABELS = [
    'BLOG',
    'DIY',
    'DRIVING',
    'COOKING',
    'DESIGN',
    'IT',
    'JOURNALISM',
    'LAW',
    'ANIMATION_EDUCATION',
    'SOUND_LIGHTS',
    'SOCIAL-MEDIA',
    'MECHANICS',
    'PHYSICAL-SECURITY',
    'MUSIC',
    'AGRICULTURE',
    'PAINTER',
    'SCHOLAR',
    'SCHEDULING',
    'MEDIA',
    'RADIO-TV',
] as const;
type skillType = (typeof SKILL_LABELS)[number];
const SKILLS: Record<skillType, { label: skillType; value: string }> = {
    BLOG: { label: 'BLOG', value: 'Blog' },
    DIY: { label: 'DIY', value: 'Bricoleur' },
    DRIVING: { label: 'DRIVING', value: 'Chauffeur' },
    COOKING: { label: 'COOKING', value: 'Cuisinier' },
    DESIGN: { label: 'DESIGN', value: 'Graphiste, infographiste, dessinateur' },
    IT: { label: 'IT', value: 'Informaticien, développeur, jeux-vidéo' },
    JOURNALISM: { label: 'JOURNALISM', value: 'Journaliste' },
    LAW: { label: 'LAW', value: 'Juriste' },
    ANIMATION_EDUCATION: {
        label: 'ANIMATION_EDUCATION',
        value: "Maîtrise des techniques d'éducation populaire et animation",
    },
    SOUND_LIGHTS: { label: 'SOUND_LIGHTS', value: 'Maîtrise son, lumière, électricien' },
    'SOCIAL-MEDIA': { label: 'SOCIAL-MEDIA', value: 'Maîtrise Facebook / Twitter' },
    MECHANICS: { label: 'MECHANICS', value: 'Mécanicien' },
    'PHYSICAL-SECURITY': { label: 'PHYSICAL-SECURITY', value: 'Métiers de la sécurité' },
    MUSIC: { label: 'MUSIC', value: 'Musicien' },
    AGRICULTURE: { label: 'AGRICULTURE', value: 'Paysan, vigneron' },
    PAINTER: { label: 'PAINTER', value: 'Peintre, graffeur' },
    SCHOLAR: { label: 'SCHOLAR', value: 'Professeur, écrivain, universitaire' },
    SCHEDULING: {
        label: 'SCHEDULING',
        value: "Secrétariat, accueil téléphonique, gestion d'emploi du temps",
    },
    MEDIA: { label: 'MEDIA', value: 'Vidéos, photos' },
    'RADIO-TV': { label: 'RADIO-TV', value: 'Veille télés et radios' },
};

export { SKILL_LABELS, SKILLS };

export type { skillType };
