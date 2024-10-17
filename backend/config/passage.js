import { PassageFlex } from '@passageidentity/passage-flex-node';

const passage = new PassageFlex({
    appId: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
});

export default passage;