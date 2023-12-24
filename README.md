# pal.ai

[pal.ai] is a progressive web app that uses images of rice leaves to identify rice leaf diseases.

In the back end, we use a minimal [SvelteKit] server that proxies the [Hugging Face Hosted Inference API], which interfaces with a model that uses a [BEiT vision transformer model][BEiT] to classify images of rice plants for the presence/absence of diseases. The model is pre-trained using [ImageNet 22k] then finetuned using the [PH Rice Leave Diseases dataset](https://www.kaggle.com/datasets/shrupyag001/philippines-rice-diseases). The model achieves **95% accuracy** using the dataset test set despite having only 1120 training data points.

[pal.ai]: https://palai.vercel.app/
[SvelteKit]: https://kit.svelte.dev/
[Hugging Face Hosted Inference API]: https://huggingface.co/docs/api-inference/index
[BEiT]: https://arxiv.org/pdf/2106.08254.pdf
[ImageNet 22k]: https://arxiv.org/pdf/1409.0575.pdf

-   Kaggle Notebook: [_Classification by Fine-tuning BEiT_](https://www.kaggle.com/code/josekristianresabal/classification-by-fine-tuning-beit)
-   Hugging Face Hub Link for the Model: [_jkrperson/Beit-for-rice-disease_](https://huggingface.co/jkrperson/Beit-for-rice-disease)
-   Weights & Biases Experiments: [_jkrperson/huggingface_](https://wandb.ai/jkrperson/huggingface/overview?workspace=user-jkrperson)

In the front end, [pal.ai] is an installable progressive web app (PWA) written in [TypeScript] with the [Svelte] framework. It uses the [Vite] build system for asset bundling, packaging, and optimization. The PWA allows users to upload their own images of rice plants for classification.

[Svelte]: https://svelte.dev/
[TypeScript]: https://www.typescriptlang.org/
[Vite]: https://vitejs.dev/

# Environment Variables

| **Name**  | **Description**                                                                       |
| --------- | ------------------------------------------------------------------------------------- |
| `API_KEY` | API key from [Hugging Face profile settings](https://huggingface.co/settings/tokens). |

# Project Members

-   [Macaraeg, Marc Gabriel C.](https://github.com/SporadicToast)
-   [Ortiz, Sebastian Luis S.](https://github.com/BastiDood)
-   [Raborar, Angelica Julianne A.](https://github.com/Anjellyrika)
-   [Resabal, Jose Kristian K.](https://github.com/jkrperson)
