import Accordion from "@/components/lineup/Accordion";
import DaySchedule from "@/components/lineup/schedule/DaySchedule";

const ByDay = ({ data }) => {
  const stages = data;

  const Midgard = stages.Midgard;
  const MidMon = Midgard.mon;
  const MidTues = Midgard.tue;
  const MidWed = Midgard.wed;
  const MidThur = Midgard.thu;
  const MidFri = Midgard.fri;
  const MidSat = Midgard.sat;
  const MidSun = Midgard.sun;

  const Vanaheim = stages.Vanaheim;
  const VanaMon = Vanaheim.mon;
  const VanaTues = Vanaheim.tue;
  const VanaWed = Vanaheim.wed;
  const VanaThur = Vanaheim.thu;
  const VanaFri = Vanaheim.fri;
  const VanaSat = Vanaheim.sat;
  const VanaSun = Vanaheim.sun;

  const Jotunheim = stages.Jotunheim;
  const JotunMon = Jotunheim.mon;
  const JotunTues = Jotunheim.tue;
  const JotunWed = Jotunheim.wed;
  const JotunThur = Jotunheim.thu;
  const JotunFri = Jotunheim.fri;
  const JotunSat = Jotunheim.sat;
  const JotunSun = Jotunheim.sun;
  // console.log("JotunSat", JotunSat);

  return (
    <section className="grid gap-4">
      <Accordion summary="Monday" name="day">
        <DaySchedule jotun={JotunMon} mid={MidMon} vana={VanaMon}></DaySchedule>
      </Accordion>
      <Accordion summary="Tuesday" name="day">
        <DaySchedule jotun={JotunTues} mid={MidTues} vana={VanaTues}></DaySchedule>
      </Accordion>
      <Accordion summary="Wednesday" name="day">
        <DaySchedule jotun={JotunWed} mid={MidWed} vana={VanaWed}></DaySchedule>
      </Accordion>
      <Accordion summary="Thursday" name="day">
        <DaySchedule jotun={JotunThur} mid={MidThur} vana={VanaThur}></DaySchedule>
      </Accordion>
      <Accordion summary="Friday" name="day">
        <DaySchedule jotun={JotunFri} mid={MidFri} vana={VanaFri}></DaySchedule>
      </Accordion>
      <Accordion summary="Saturday" name="day">
        <DaySchedule jotun={JotunSat} mid={MidSat} vana={VanaSat}></DaySchedule>
      </Accordion>
      <Accordion summary="Sunday" name="day">
        <DaySchedule jotun={JotunSun} mid={MidSun} vana={VanaSun}></DaySchedule>
      </Accordion>
    </section>
  );
};

export default ByDay;
