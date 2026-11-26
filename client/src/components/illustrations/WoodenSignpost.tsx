import { MascotPuppy } from "./MascotPuppy";

/** Tall center wooden signpost pole with mascot puppy peeking beside the base. */
export function WoodenSignpost() {
  return (
    <div className="relative flex flex-col items-center justify-between lg:h-full select-none" aria-hidden="true">
      {/* Vertical wooden post */}
      <div
        className="hidden lg:block w-6 flex-1 min-h-[26rem] rounded-t-lg rounded-b-sm border-[3px] border-[#2a170e]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 5px, rgba(42,23,14,0.12) 5px 6px), linear-gradient(90deg, #d38f45, #b8742f)",
        }}
      />
      <div className="lg:absolute lg:-bottom-10 lg:left-1/2 lg:-translate-x-[45%]">
        <MascotPuppy pose="walking" className="w-28 h-28 sm:w-36 sm:h-32" animateFloat />
      </div>
    </div>
  );
}
