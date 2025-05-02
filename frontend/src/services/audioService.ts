import api from "./api"
import { Audio } from "../types/Audio"
import { AudioProcessing } from "../types/AudioProcessing"
import { Word } from "../components/AudioContext"

export const uploadAudio = async (user_id: number, file: FormData): Promise<Audio> => {
    const response = await api.post(`audio/${user_id}`, file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
  }

export const getAudio = async (user_id: number): Promise<Blob> => {
  const response = await api.get(`audio/${user_id}`, {
    responseType: 'blob'
  });
  return response.data;
};

export const processAudio = async (user_id: number, words: Word[]): Promise<AudioProcessing> => {
    console.log("Processing audio with words:", words);
    const response = await api.post(`audio/${user_id}/process`, words);
    return response.data
}

export const getProcessedAudio = async (user_id: number): Promise<File> => {
    const response = await api.get(`audio/${user_id}/process`, {
    responseType: 'blob'
  });
    return response.data
}

export const getTimestamps = async (user_id: number): Promise<Word[]> => {
    // const response = await api.get(`audio/${user_id}/timestamps`)
    // const data = {"word_timestamps":[{"endTime":949,"isRemoved":false,"startTime":729,"word":"Hey,"},{"endTime":1630,"isRemoved":false,"startTime":1490,"word":"I'm"},{"endTime":1730,"isRemoved":false,"startTime":1670,"word":"an"},{"endTime":2251,"isRemoved":false,"startTime":1830,"word":"AI,"},{"endTime":2471,"isRemoved":false,"startTime":2391,"word":"and"}]};
    return [
      {
          "endTime": 3953,
          "isRemoved": false,
          "startTime": 3773,
          "word": "Sea"
      },
      {
          "endTime": 4353,
          "isRemoved": false,
          "startTime": 4013,
          "word": "turtles"
      },
      {
          "endTime": 4653,
          "isRemoved": false,
          "startTime": 4533,
          "word": "are"
      },
      {
          "endTime": 5653,
          "isRemoved": false,
          "startTime": 5313,
          "word": "truly"
      },
      {
          "endTime": 6153,
          "isRemoved": false,
          "startTime": 5713,
          "word": "incredible"
      },
      {
          "endTime": 6494,
          "isRemoved": false,
          "startTime": 6194,
          "word": "marine"
      },
      {
          "endTime": 6934,
          "isRemoved": false,
          "startTime": 6534,
          "word": "creatures."
      },
      {
          "endTime": 7794,
          "isRemoved": false,
          "startTime": 7594,
          "word": "They've"
      },
      {
          "endTime": 7954,
          "isRemoved": false,
          "startTime": 7814,
          "word": "been"
      },
      {
          "endTime": 8354,
          "isRemoved": false,
          "startTime": 7994,
          "word": "swimming"
      },
      {
          "endTime": 9195,
          "isRemoved": false,
          "startTime": 9135,
          "word": "in"
      },
      {
          "endTime": 9355,
          "isRemoved": false,
          "startTime": 9255,
          "word": "our"
      },
      {
          "endTime": 9715,
          "isRemoved": false,
          "startTime": 9415,
          "word": "oceans"
      },
      {
          "endTime": 10055,
          "isRemoved": false,
          "startTime": 9815,
          "word": "since"
      },
      {
          "endTime": 10435,
          "isRemoved": true,
          "startTime": 10175,
          "word": "shit,"
      },
      {
          "endTime": 10715,
          "isRemoved": false,
          "startTime": 10635,
          "word": "the"
      },
      {
          "endTime": 10935,
          "isRemoved": false,
          "startTime": 10795,
          "word": "age"
      },
      {
          "endTime": 11015,
          "isRemoved": false,
          "startTime": 10955,
          "word": "of"
      },
      {
          "endTime": 11596,
          "isRemoved": false,
          "startTime": 11055,
          "word": "dinosaurs."
      },
      {
          "endTime": 12416,
          "isRemoved": false,
          "startTime": 12296,
          "word": "When"
      },
      {
          "endTime": 12496,
          "isRemoved": false,
          "startTime": 12456,
          "word": "a"
      },
      {
          "endTime": 12676,
          "isRemoved": false,
          "startTime": 12536,
          "word": "sea"
      },
      {
          "endTime": 12976,
          "isRemoved": false,
          "startTime": 12716,
          "word": "turtle"
      },
      {
          "endTime": 13216,
          "isRemoved": false,
          "startTime": 12996,
          "word": "lays"
      },
      {
          "endTime": 13476,
          "isRemoved": false,
          "startTime": 13276,
          "word": "eggs,"
      },
      {
          "endTime": 13797,
          "isRemoved": true,
          "startTime": 13557,
          "word": "fuck."
      },
      {
          "endTime": 14197,
          "isRemoved": false,
          "startTime": 14137,
          "word": "It"
      },
      {
          "endTime": 14577,
          "isRemoved": false,
          "startTime": 14237,
          "word": "returns"
      },
      {
          "endTime": 14717,
          "isRemoved": false,
          "startTime": 14637,
          "word": "to"
      },
      {
          "endTime": 14817,
          "isRemoved": false,
          "startTime": 14737,
          "word": "the"
      },
      {
          "endTime": 15057,
          "isRemoved": false,
          "startTime": 14837,
          "word": "very"
      },
      {
          "endTime": 15317,
          "isRemoved": false,
          "startTime": 15097,
          "word": "same"
      },
      {
          "endTime": 15597,
          "isRemoved": false,
          "startTime": 15357,
          "word": "beach"
      },
      {
          "endTime": 15797,
          "isRemoved": false,
          "startTime": 15637,
          "word": "where"
      },
      {
          "endTime": 15877,
          "isRemoved": false,
          "startTime": 15817,
          "word": "it"
      },
      {
          "endTime": 16258,
          "isRemoved": false,
          "startTime": 15917,
          "word": "hatched,"
      },
      {
          "endTime": 16618,
          "isRemoved": false,
          "startTime": 16458,
          "word": "even"
      },
      {
          "endTime": 16878,
          "isRemoved": false,
          "startTime": 16698,
          "word": "after"
      },
      {
          "endTime": 17358,
          "isRemoved": false,
          "startTime": 16958,
          "word": "decades"
      },
      {
          "endTime": 17458,
          "isRemoved": false,
          "startTime": 17398,
          "word": "at"
      },
      {
          "endTime": 17738,
          "isRemoved": false,
          "startTime": 17518,
          "word": "sea."
      },
      {
          "endTime": 18078,
          "isRemoved": false,
          "startTime": 17998,
          "word": "And"
      },
      {
          "endTime": 18218,
          "isRemoved": false,
          "startTime": 18098,
          "word": "when"
      },
      {
          "endTime": 18479,
          "isRemoved": false,
          "startTime": 18258,
          "word": "those"
      },
      {
          "endTime": 19499,
          "isRemoved": false,
          "startTime": 19159,
          "word": "tiny"
      },
      {
          "endTime": 20139,
          "isRemoved": false,
          "startTime": 19559,
          "word": "hatchlings"
      },
      {
          "endTime": 20459,
          "isRemoved": false,
          "startTime": 20199,
          "word": "emerge"
      },
      {
          "endTime": 20599,
          "isRemoved": false,
          "startTime": 20479,
          "word": "from"
      },
      {
          "endTime": 20679,
          "isRemoved": false,
          "startTime": 20619,
          "word": "the"
      },
      {
          "endTime": 21080,
          "isRemoved": false,
          "startTime": 20719,
          "word": "sand,"
      },
      {
          "endTime": 21460,
          "isRemoved": false,
          "startTime": 21100,
          "word": "they"
      },
      {
          "endTime": 22040,
          "isRemoved": true,
          "startTime": 21820,
          "word": "shit"
      },
      {
          "endTime": 22700,
          "isRemoved": false,
          "startTime": 22280,
          "word": "immediately"
      },
      {
          "endTime": 22960,
          "isRemoved": false,
          "startTime": 22740,
          "word": "start"
      },
      {
          "endTime": 23320,
          "isRemoved": false,
          "startTime": 23000,
          "word": "crawling"
      },
      {
          "endTime": 23621,
          "isRemoved": false,
          "startTime": 23360,
          "word": "towards"
      },
      {
          "endTime": 23761,
          "isRemoved": false,
          "startTime": 23661,
          "word": "the"
      },
      {
          "endTime": 24101,
          "isRemoved": false,
          "startTime": 23861,
          "word": "ocean,"
      },
      {
          "endTime": 24481,
          "isRemoved": false,
          "startTime": 24361,
          "word": "but..."
      },
      {
          "endTime": 25263,
          "isRemoved": true,
          "startTime": 25023,
          "word": "Fuck,"
      },
      {
          "endTime": 25924,
          "isRemoved": false,
          "startTime": 25463,
          "word": "sadly,"
      },
      {
          "endTime": 26484,
          "isRemoved": false,
          "startTime": 26144,
          "word": "only"
      },
      {
          "endTime": 26564,
          "isRemoved": false,
          "startTime": 26544,
          "word": "a"
      },
      {
          "endTime": 26904,
          "isRemoved": false,
          "startTime": 26624,
          "word": "few"
      },
      {
          "endTime": 27164,
          "isRemoved": false,
          "startTime": 27064,
          "word": "out"
      },
      {
          "endTime": 27224,
          "isRemoved": false,
          "startTime": 27184,
          "word": "of"
      },
      {
          "endTime": 27504,
          "isRemoved": false,
          "startTime": 27304,
          "word": "every"
      },
      {
          "endTime": 28005,
          "isRemoved": false,
          "startTime": 27544,
          "word": "thousand"
      },
      {
          "endTime": 28405,
          "isRemoved": false,
          "startTime": 28045,
          "word": "survive"
      },
      {
          "endTime": 28525,
          "isRemoved": false,
          "startTime": 28425,
          "word": "to"
      },
      {
          "endTime": 28865,
          "isRemoved": false,
          "startTime": 28605,
          "word": "output"
      },
      {
          "endTime": 29105,
          "isRemoved": false,
          "startTime": 28885,
          "word": "because"
      },
      {
          "endTime": 29746,
          "isRemoved": false,
          "startTime": 29225,
          "word": "predators"
      },
      {
          "endTime": 29946,
          "isRemoved": false,
          "startTime": 29826,
          "word": "are"
      },
      {
          "endTime": 30446,
          "isRemoved": false,
          "startTime": 30426,
          "word": "a"
      },
      {
          "endTime": 30886,
          "isRemoved": false,
          "startTime": 30506,
          "word": "constant"
      },
      {
          "endTime": 31207,
          "isRemoved": false,
          "startTime": 30927,
          "word": "threat."
      },
      {
          "endTime": 32427,
          "isRemoved": false,
          "startTime": 32247,
          "word": "Sea"
      },
      {
          "endTime": 32848,
          "isRemoved": false,
          "startTime": 32467,
          "word": "turtles"
      },
      {
          "endTime": 33848,
          "isRemoved": false,
          "startTime": 33628,
          "word": "play"
      },
      {
          "endTime": 33888,
          "isRemoved": false,
          "startTime": 33868,
          "word": "a"
      },
      {
          "endTime": 34309,
          "isRemoved": false,
          "startTime": 33948,
          "word": "crucial"
      },
      {
          "endTime": 34549,
          "isRemoved": false,
          "startTime": 34369,
          "word": "role"
      },
      {
          "endTime": 34649,
          "isRemoved": false,
          "startTime": 34589,
          "word": "in"
      },
      {
          "endTime": 34929,
          "isRemoved": false,
          "startTime": 34669,
          "word": "marine"
      },
      {
          "endTime": 35669,
          "isRemoved": false,
          "startTime": 34949,
          "word": "ecosystems,"
      },
      {
          "endTime": 36150,
          "isRemoved": false,
          "startTime": 35889,
          "word": "eating"
      },
      {
          "endTime": 36430,
          "isRemoved": false,
          "startTime": 36210,
          "word": "things"
      },
      {
          "endTime": 36610,
          "isRemoved": false,
          "startTime": 36470,
          "word": "like"
      },
      {
          "endTime": 37150,
          "isRemoved": false,
          "startTime": 36630,
          "word": "jellyfish"
      },
      {
          "endTime": 37230,
          "isRemoved": false,
          "startTime": 37170,
          "word": "and"
      },
      {
          "endTime": 37871,
          "isRemoved": false,
          "startTime": 37330,
          "word": "seagrass,"
      },
      {
          "endTime": 38391,
          "isRemoved": false,
          "startTime": 38291,
          "word": "and"
      },
      {
          "endTime": 38711,
          "isRemoved": true,
          "startTime": 38491,
          "word": "shit,"
      },
      {
          "endTime": 39452,
          "isRemoved": false,
          "startTime": 39151,
          "word": "keeping"
      },
      {
          "endTime": 39572,
          "isRemoved": false,
          "startTime": 39492,
          "word": "the"
      },
      {
          "endTime": 39892,
          "isRemoved": false,
          "startTime": 39652,
          "word": "ocean"
      },
      {
          "endTime": 40232,
          "isRemoved": false,
          "startTime": 39912,
          "word": "healthy."
      },
      {
          "endTime": 40912,
          "isRemoved": false,
          "startTime": 40732,
          "word": "That's"
      },
      {
          "endTime": 41053,
          "isRemoved": false,
          "startTime": 40932,
          "word": "why"
      },
      {
          "endTime": 41193,
          "isRemoved": false,
          "startTime": 41093,
          "word": "it's"
      },
      {
          "endTime": 41613,
          "isRemoved": false,
          "startTime": 41233,
          "word": "important"
      },
      {
          "endTime": 41753,
          "isRemoved": false,
          "startTime": 41633,
          "word": "for"
      },
      {
          "endTime": 42133,
          "isRemoved": false,
          "startTime": 41793,
          "word": "humans"
      },
      {
          "endTime": 42253,
          "isRemoved": false,
          "startTime": 42173,
          "word": "to"
      },
      {
          "endTime": 42613,
          "isRemoved": false,
          "startTime": 42293,
          "word": "protect"
      },
      {
          "endTime": 42854,
          "isRemoved": false,
          "startTime": 42673,
          "word": "them"
      },
      {
          "endTime": 43494,
          "isRemoved": false,
          "startTime": 43394,
          "word": "and"
      },
      {
          "endTime": 43794,
          "isRemoved": false,
          "startTime": 43514,
          "word": "their"
      },
      {
          "endTime": 44394,
          "isRemoved": false,
          "startTime": 44054,
          "word": "nesting"
      },
      {
          "endTime": 44715,
          "isRemoved": false,
          "startTime": 44455,
          "word": "sites"
      },
      {
          "endTime": 44975,
          "isRemoved": false,
          "startTime": 44795,
          "word": "from"
      },
      {
          "endTime": 45455,
          "isRemoved": false,
          "startTime": 45035,
          "word": "dangers"
      },
      {
          "endTime": 45655,
          "isRemoved": false,
          "startTime": 45515,
          "word": "like"
      },
      {
          "endTime": 46216,
          "isRemoved": false,
          "startTime": 45695,
          "word": "pollution"
      },
      {
          "endTime": 46396,
          "isRemoved": false,
          "startTime": 46316,
          "word": "and"
      },
      {
          "endTime": 46876,
          "isRemoved": false,
          "startTime": 46456,
          "word": "habitat"
      },
      {
          "endTime": 47156,
          "isRemoved": false,
          "startTime": 46896,
          "word": "loss."
      },
      {
          "endTime": 48497,
          "isRemoved": false,
          "startTime": 48057,
          "word": "Otherwise,"
      },
      {
          "endTime": 48997,
          "isRemoved": false,
          "startTime": 48857,
          "word": "we"
      },
      {
          "endTime": 49217,
          "isRemoved": false,
          "startTime": 49017,
          "word": "risk"
      },
      {
          "endTime": 49558,
          "isRemoved": false,
          "startTime": 49277,
          "word": "losing"
      },
      {
          "endTime": 49838,
          "isRemoved": false,
          "startTime": 49598,
          "word": "these"
      },
      {
          "endTime": 50638,
          "isRemoved": true,
          "startTime": 50298,
          "word": "fucking"
      },
      {
          "endTime": 51239,
          "isRemoved": false,
          "startTime": 50858,
          "word": "beautiful"
      },
      {
          "endTime": 51559,
          "isRemoved": false,
          "startTime": 51319,
          "word": "ancient"
      },
      {
          "endTime": 51959,
          "isRemoved": false,
          "startTime": 51639,
          "word": "animals"
      },
      {
          "endTime": 52339,
          "isRemoved": false,
          "startTime": 51999,
          "word": "forever."
      },
      {
          "endTime": 53280,
          "isRemoved": false,
          "startTime": 53180,
          "word": "And"
      },
      {
          "endTime": 53540,
          "isRemoved": true,
          "startTime": 53360,
          "word": "shit."
      },
      {
          "endTime": 54348,
          "isRemoved": false,
          "startTime": 54227,
          "word": "that"
      },
      {
          "endTime": 54510,
          "isRemoved": false,
          "startTime": 54389,
          "word": "would"
      },
      {
          "endTime": 54652,
          "isRemoved": false,
          "startTime": 54551,
          "word": "be"
      },
      {
          "endTime": 54713,
          "isRemoved": false,
          "startTime": 54692,
          "word": "a"
      },
      {
          "endTime": 55016,
          "isRemoved": false,
          "startTime": 54773,
          "word": "huge"
      },
      {
          "endTime": 55280,
          "isRemoved": false,
          "startTime": 55057,
          "word": "loss"
      },
      {
          "endTime": 55421,
          "isRemoved": false,
          "startTime": 55300,
          "word": "for"
      },
      {
          "endTime": 55563,
          "isRemoved": false,
          "startTime": 55482,
          "word": "our"
      },
      {
          "endTime": 55847,
          "isRemoved": false,
          "startTime": 55604,
          "word": "planet."
      }
  ];
    // return data["word_timestamps"];
}