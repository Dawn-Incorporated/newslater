"use client"

import { Button } from '@/components/ui/button';
import { toast } from 'sonner'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      newslater.

      <Button onClick={() => toast('My first toast')}>
        Give me a toast
      </Button>
    </div>
  );
}
