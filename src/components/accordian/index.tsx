import React from 'react'
import {AccordionContent, AccordionItem, AccordionTrigger, Accordion as ShadcnAccordian} from "@/components/ui/accordion"

type Props = {
    trigger: string
    content: string
}

const Accordian = ({trigger,content}: Props) => {
  return (
    <ShadcnAccordian
        type="single"
        collapsible
    >
        <AccordionItem value="item-1">
            <AccordionTrigger>
                {trigger}
            </AccordionTrigger>
            <AccordionContent>
                {content}
            </AccordionContent>
        </AccordionItem>
    </ShadcnAccordian>
  )
}

export default Accordian