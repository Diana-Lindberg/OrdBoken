import { http, HttpResponse } from 'msw';

const data =[{
  active: true,
  word: 'test',
  phonetics: [{audio: 'https://test.com/test.mp3'}],
  meanings: [
    {
      definitions: [{definition: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}] 
    },
  ],
  
    },
  ]

 export const handlers = [
   http.get('https://api.dictionaryapi.dev/api/v2/entries/en/test', () => {
    return HttpResponse.json(data);
  }),
 http.post('https://api.dictionaryapi.dev/api/v2/entries/en/test', () => {
   return HttpResponse.json(data);
 }),
] 

