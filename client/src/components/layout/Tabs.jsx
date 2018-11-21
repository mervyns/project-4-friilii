import React from 'react'
import { Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: 'Loss of Income', render: () => <Tab.Pane>Loss of Income protects you against loss of Income. In the gig economy, many people do not have a stable source of income and might lose their daily income if something happens. We allow you to insure against your loss of income with our friilii Loss Of Income Plan.</Tab.Pane> },
  { menuItem: 'Medical Insurance', render: () => <Tab.Pane>As freelancers, we often do not have company medical insurance. friilii offers you a comprehensive P2P insurance where we keep premiums low by cutting out the middleman and submitting fair and accurate medical claims. </Tab.Pane> },
  { menuItem: 'Transport Insurance', render: () => <Tab.Pane>Freelancers often do not have corporate cards to pay for their transport. In the event of last-minute emergencies or rain, our transport insurance reimburses 70% of your transport fare incurred.</Tab.Pane> },
]

const TabExampleBasic = () => <Tab panes={panes} />

export default TabExampleBasic
