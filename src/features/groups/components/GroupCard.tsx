import Loader from '@/components/screens/Loader'
import { Button } from '@/components/ui/button'
import { slugifyUsername } from '@/helpers/helpers'
import { Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useJoinGroup } from '../hooks/useJoinGroup'
import { useSession } from 'next-auth/react'

const GroupCard = ({ group }: any) => {
  const session: any = useSession();
  const { isLoading: isJoiningGroup, handleJoinGroup } = useJoinGroup();

  const isUserInGroup = group.members?.some(
    (member: any) => member.userId === session.data.user.id
  );

  return (
    <div className="w-auto h-34 rounded-md shadow-md p-2 bg-accent/50">
      <div className="w-full flex justify-between">
        <div className="grid">
          <div className="flex gap-2 items-center">
            <Link
              href={`/groups/${slugifyUsername(group.name)}`}
              className="w-5 h-5 p-4 rounded-full bg-accent flex justify-center items-center text-primary"
            >
              {group.name[0].toUpperCase()}
            </Link>
            <Link
              href={`/groups/${slugifyUsername(group.name)}`}
              className="font-semibold text-xl hover:underline cursor-pointer transition-all"
            >
              {group.name}
            </Link>
          </div>
          <span className="text-xs text-primary flex gap-1 items-center">
            <Users size={18} strokeWidth={1} />
            {group.members.length}
          </span>
        </div>
        <Button
          disabled={isJoiningGroup}
          onClick={() => handleJoinGroup(group.id)}
          variant={'secondary'}
          size={'sm'}
          className="text-primary hover:text-white cursor-pointer"
        >
          {isJoiningGroup ? (
            <Loader />
          ) : isUserInGroup ? (
            'Leave group'
          ) : (
            'Join'
          )}
        </Button>
      </div>
      <p className="text-gray-500">{group.description}</p>
    </div>
  );
};

export default GroupCard;
