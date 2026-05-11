import TeamMemberCard, { type TeamMember } from "@/components/team-member-card";

type TeamMembersListProps = {
  members: readonly TeamMember[];
};

export default function TeamMembersList({ members }: TeamMembersListProps) {
  return (
    <div>
      <div className="flex flex-col gap-7 min-[520px]:hidden">
        <ul className="grid grid-cols-3 gap-x-2">
          {members.slice(0, 3).map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </ul>
        <ul className="mx-auto grid w-[56%] grid-cols-2 gap-x-2">
          {members.slice(3).map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </ul>
      </div>

      <ul className="hidden grid-cols-5 gap-x-6 min-[520px]:grid">
        {members.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </ul>
    </div>
  );
}
