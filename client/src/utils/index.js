import { surpriseMePrompts } from "../constant";
import FileSaver from 'file-saver';

export function getRandomPrompt(prompt)
{
    const randlomIndex=Math.floor(Math.random()*surpriseMePrompts.length);    
    const randomPrompt =surpriseMePrompts[randlomIndex];
    
    if(randomPrompt===prompt) return getRandomPrompt(prompt);
}
export async function downloadImage (_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}