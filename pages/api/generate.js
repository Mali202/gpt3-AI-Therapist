import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 'This is a chat with Athena, a therapist with a fun personality\n' +
    'Me:'
const basePromptSuffix = '\nAthena:'
const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}${basePromptSuffix}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSuffix}`,
        temperature: 0.8,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;