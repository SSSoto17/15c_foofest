import Accordion from "@/components/lineup/Accordion";
import DaySchedule from "@/components/lineup/DaySchedule";

const ByDay = ({ data }) => {
  const stages = data;

  const Midgard = stages.Midgard;
  const MidThur = Midgard.thu;
  const MidFri = Midgard.fri;
  const MidSat = Midgard.sat;

  const Vanaheim = stages.Vanaheim;
  const VanaThur = Vanaheim.thu;
  const VanaFri = Vanaheim.fri;
  const VanaSat = Vanaheim.sat;

  const Jotunheim = stages.Jotunheim;
  const JotunThur = Jotunheim.thu;
  const JotunFri = Jotunheim.fri;
  const JotunSat = Jotunheim.sat;
  console.log("JotunSat", JotunSat);

  return (
    <section className="grid gap-4">
      <Accordion summary="Thursday">
        <DaySchedule jotun={JotunThur} mid={MidThur} vana={VanaThur}></DaySchedule>
      </Accordion>
      <Accordion summary="Friday">
        <DaySchedule jotun={JotunFri} mid={MidFri} vana={VanaFri}></DaySchedule>
      </Accordion>
      <Accordion summary="Saturday">
        <DaySchedule jotun={JotunSat} mid={MidSat} vana={VanaSat}></DaySchedule>
      </Accordion>
    </section>
  );
};

export default ByDay;
