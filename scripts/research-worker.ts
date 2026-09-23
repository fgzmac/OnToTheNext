import "dotenv/config";
import {runNextResearchJob} from "../src/modules/research/worker";
import {getPrismaClient} from "../src/lib/prisma";
const serve=process.argv.includes("--serve"),stop=Date.now()+60*60_000;
let stopped=false;process.on("SIGINT",()=>{stopped=true;});process.on("SIGTERM",()=>{stopped=true;});
try{
 do { const id=await runNextResearchJob();if(id)console.log("Processed research job",id);
   if(!serve||stopped)break;await new Promise(resolve=>setTimeout(resolve,1000));
 }while(Date.now()<stop);
}catch(error){console.error(error instanceof Error?error.message:"Worker failed");process.exitCode=1;}
finally{await getPrismaClient().$disconnect();}
// Queue polling never creates research; only an organizer action creates jobs.
// Crash/restart leaves charged reservations intact and requires an explicit retry.
