'use client'
import React from 'react'
import { Steps } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

const ItemStepToWork = ({ step }: { step: Steps }) => {
    const {attributes, listeners, setNodeRef, transition, transform} =useSortable({id: step.id})

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }
  return (
    <Card {...attributes} {...listeners} ref={setNodeRef} style={style}>
      <CardContent className='flex justify-start p-2 bg-slate-500 text-white dark:bg-slate-800' >
        {step.description}
      </CardContent>
    </Card>
  )
}

export default ItemStepToWork