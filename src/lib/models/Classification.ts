import { type Output, array, enum_, maxValue, minValue, number, object } from 'valibot';

export enum Disease {
    BacterialLeafBlight = 'bacterial_leaf_blight',
    BacterialLeafStreak = 'bacterial_leaf_streak',
    Bakanae = 'bakanae',
    BrownSpot = 'brown_spot',
    GrassyStuntVirus = 'grassy_stunt_virus',
    HealthyRicePlant = 'healthy_rice_plant',
    NarrowBrownSpot = 'narrow_brown_spot',
    RaggedStuntVirus = 'ragged_stunt_virus',
    RiceBlast = 'rice_blast',
    RiceFalseSmut = 'rice_false_smut',
    SheathBlight = 'sheath_blight',
    SheathRot = 'sheath_rot',
    StemRot = 'stem_rot',
    TungroVirus = 'tungro_virus',
}

export function displayDiseaseName(disease: Disease) {
    switch (disease) {
        case Disease.BacterialLeafBlight:
            return 'Bacterial Leaf Blight';
        case Disease.BacterialLeafStreak:
            return 'Bacterial Leaf Streak';
        case Disease.Bakanae:
            return 'Bakanae';
        case Disease.BrownSpot:
            return 'Brown Spot';
        case Disease.GrassyStuntVirus:
            return 'Grassy Stunt Virus';
        case Disease.HealthyRicePlant:
            return 'Healthy';
        case Disease.NarrowBrownSpot:
            return 'Narrow Brown Spot';
        case Disease.RaggedStuntVirus:
            return 'Ragged Stunt Virus';
        case Disease.RiceBlast:
            return 'Rice Blast';
        case Disease.RiceFalseSmut:
            return 'Rice False Smut';
        case Disease.SheathBlight:
            return 'Sheath Blight';
        case Disease.SheathRot:
            return 'Sheath Rot';
        case Disease.StemRot:
            return 'Stem Rot';
        case Disease.TungroVirus:
            return 'Tungro Virus';
        default:
            throw new Error('unexpected disease type');
    }
}

export const Classification = object({
    label: enum_(Disease),
    score: number([minValue(0), maxValue(1)]),
});

export type Classification = Output<typeof Classification>;

export const Classifications = array(Classification);

export type Classifications = Output<typeof Classifications>;
