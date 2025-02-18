const KEY = 'MISSION_POPULAIRE_ROLE';

const ROLES = ['MILITANT', 'CHEF_GA'] as const;
type roleType = (typeof ROLES)[number];

function get(): roleType {
    const value = localStorage.getItem(KEY);
    if (!value) {
        return 'MILITANT';
    }
    return value as roleType;
}

function set(value: roleType) {
    localStorage.setItem(KEY, value);
}

function remove() {
    localStorage.removeItem(KEY);
}

const roleHandler = { get, set, remove };

export { roleHandler };
export type { roleType };
