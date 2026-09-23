import "dotenv/config";
import {startDestinationResearch} from "../src/modules/research/service";
import {runResearchJob} from "../src/modules/research/worker";
import {getPrismaClient} from "../src/lib/prisma";
const [tripId,segmentId,country,language="en"]=process.argv.slice(2);
try {
 if(!tripId||!segmentId||!country)throw new Error("Usage: research:evaluate <tripId> <segmentId> <country> [language]; use an existing explicitly approved pilot trip");
 const start=await startDestinationResearch({tripId,segmentId,country,language});if(!start.ok)throw new Error(start.error);
 await runResearchJob(start.id);
 const db=getPrismaClient(),job=await db.researchJob.findUniqueOrThrow({where:{id:start.id}});
 const candidates=await db.researchCandidate.findMany({where:{jobId:start.id},select:{identity:true,reasons:true,publishedPlaceId:true}});
 console.log(JSON.stringify({id:job.id,state:job.state,context:job.context,searches:job.searches,documents:job.documents,extractions:job.extractions,
 requests:job.requestLog,actualInputTokens:job.actualInputTokens,actualOutputTokens:job.actualOutputTokens,
 reservedUsd:job.reservedUsd,budgetUsd:job.budgetUsd,startedAt:job.startedAt,finishedAt:job.finishedAt,reason:job.reason,candidates},null,2));
}catch(error){console.error(error instanceof Error?error.message:"Evaluation failed");process.exitCode=1;}
finally{await getPrismaClient().$disconnect();}
