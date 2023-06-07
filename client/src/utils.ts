export function displayNames(raw: string) {
    switch (raw) {
        case 'bacterial_leaf_blight':
            return 'Bacterial leaf blight';
        case 'bacterial_leaf_streak':
            return 'Bacterial leaf streak';
        case 'bakanae':
            return 'Bakanae';
        case 'brown_spot':
            return 'Brown spot';
        case 'grassy_stunt_virus':
            return 'Grassy stunt virus';
        case 'healthy_rice_plant':
            return 'Healthy';
        case 'narrow_brown_spot':
            return 'Narrow brown spot';
        case 'ragged_stunt_virus':
            return 'Ragged stunt virus';
        case 'rice_blast':
            return 'Rice blast';
        case 'rice_false_smut':
            return 'Rice false smut';
        case 'sheath_blight':
            return 'Sheath blight';
        case 'sheath_rot':
            return 'Sheath rot';
        case 'stem_rot':
            return 'Stem rot';
        case 'tungro_virus':
            return 'Tungro virus';
        default:
            return '';
    }
}
