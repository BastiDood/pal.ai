import { Disease } from './models/Classification.ts';

export function displayNames(disease: Disease) {
    switch (disease) {
        case Disease.BacterialLeafBlight:
            return 'Bacterial leaf blight';
        case Disease.BacterialLeafStreak:
            return 'Bacterial leaf streak';
        case Disease.Bakanae:
            return 'Bakanae';
        case Disease.BrownSpot:
            return 'Brown spot';
        case Disease.GrassyStuntVirus:
            return 'Grassy stunt virus';
        case Disease.HealthyRicePlant:
            return 'Healthy';
        case Disease.NarrowBrownSpot:
            return 'Narrow brown spot';
        case Disease.RaggedStuntVirus:
            return 'Ragged stunt virus';
        case Disease.RiceBlast:
            return 'Rice blast';
        case Disease.RiceFalseSmut:
            return 'Rice false smut';
        case Disease.SheathBlight:
            return 'Sheath blight';
        case Disease.SheathRot:
            return 'Sheath rot';
        case Disease.StemRot:
            return 'Stem rot';
        case Disease.TungroVirus:
            return 'Tungro virus';
        default:
            throw new Error('unexpected disease type');
    }
}
