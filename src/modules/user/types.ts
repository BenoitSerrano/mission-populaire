const SKILLS = [
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
type skillType = (typeof SKILLS)[number];

export { SKILLS };

export type { skillType };
