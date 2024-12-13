import Accordion from "@/components/lineup/Accordion";
import StageSchedule from "@/components/lineup/schedule/StageSchedule";

const ByStage = ({ data }) => {
  const stages = data;
  // console.log("STAGES", stages);
  const Midgard = stages.Midgard;
  const Vanaheim = stages.Vanaheim;
  const Jotunheim = stages.Jotunheim;
  // console.log("JOTUNHEIM", Jotunheim);

  return (
    <section className="grid gap-4">
      <Accordion summary="Jotunheim" name="stage">
        <StageSchedule data={Jotunheim}></StageSchedule>
      </Accordion>
      <Accordion summary="Midgard" name="stage">
        <StageSchedule data={Midgard}></StageSchedule>
      </Accordion>
      <Accordion summary="Vanaheim" name="stage">
        <StageSchedule data={Vanaheim}></StageSchedule>
      </Accordion>
    </section>
  );
};

export default ByStage;
