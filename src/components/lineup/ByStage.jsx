import Accordion from "@/components/lineup/Accordion";
import StageSchedule from "@/components/lineup/StageSchedule";

const ByStage = ({ data }) => {
  const stages = data;
  // console.log("STAGES", stages);
  const Midgard = stages.Midgard;
  const Vanaheim = stages.Vanaheim;
  const Jotunheim = stages.Jotunheim;
  // console.log("JOTUNHEIM", Jotunheim);

  return (
    <section className="grid gap-4">
      <Accordion summary="Jotunheim">
        <StageSchedule data={Jotunheim}></StageSchedule>
      </Accordion>
      <Accordion summary="Midgard">
        <StageSchedule data={Midgard}></StageSchedule>
      </Accordion>
      <Accordion summary="Vanaheim">
        <StageSchedule data={Vanaheim}></StageSchedule>
      </Accordion>
    </section>
  );
};

export default ByStage;
