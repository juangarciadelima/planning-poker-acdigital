import React, { Fragment } from 'react'
import './cardRoom.css'
import '@elastic/eui/dist/eui_theme_amsterdam_light.css'
import { Grid, Box, Text } from '@chakra-ui/react'

import {
  EuiIcon,
  EuiSpacer,
  EuiTabbedContent,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui'

export default function CardRoom() {
  const tabs = [
    {
      id: 'active-stories',
      name: 'Active Stories',
      prepend: (
        <i className="svgActive">
          <EuiIcon type="dot" />
        </i>
      ),
      content: (
        <Fragment>
          <EuiSpacer />
          <Text>Histórias Ativas</Text>
        </Fragment>
      )
    },
    {
      id: 'completed-stories',
      name: 'Completed Stories',
      prepend: <EuiIcon type="check" className="svgActive" />,
      content: (
        <Fragment>
          <EuiSpacer />
          <Text>Completed stories</Text>
        </Fragment>
      )
    },
    {
      id: 'stories',
      name: 'Stories',
      prepend: <EuiIcon type="list" className="svgActive" />,
      content: (
        <Fragment>
          <EuiSpacer />
          <Text className="selectedTab">All stories</Text>
        </Fragment>
      )
    }
  ]

  const cards = [
    {
      layout: 'vertical',
      title: 1
    },
    { title: 2 },
    { title: 3 },
    { title: 10 },
    { title: 40 },
    { title: 100 },
    { title: '1 / 2' }
  ]
  return (
    <div className="grid">
      <Grid marginLeft="1rem" templateColumns="1.75fr 1fr" gap={2}>
        <Box marginTop="2rem" w="100%" h="750px" marginLeft="2rem">
          <Grid templateRows="0.4fr 1.5fr 0.5fr" gap={8}>
            <Box
              textAlign="center"
              d="flex"
              justifyContent="center"
              w="90%"
              alignItems="center"
            >
              <Text alignItems="center" fontSize="3xl">
                História Teste
              </Text>
            </Box>
            <Box
              boxShadow=" 0px 0px 1px 0px rgba(0, 0, 0, 0.75)"
              d="flex"
              w="90%"
              justifyContent="center"
              alignItems="center"
              h="400px"
            >
              {cards.map(card => (
                <EuiFlexGroup
                  justifyContent="spaceAround"
                  className="cardContent"
                >
                  <EuiFlexItem grow={false}>
                    <EuiCard title={card.title} className="card" />
                  </EuiFlexItem>
                </EuiFlexGroup>
              ))}
            </Box>
            <Box
              h="150px"
              w="90%"
              boxShadow=" 0px 0px 1px 0px rgba(0, 0, 0, 0.75)"
              justifyContent="center"
              alignItems="center"
            >
              <EuiTabbedContent
                tabs={tabs}
                initialSelectedTab={tabs[0]}
                autoFocus="selected"
                onTabClick={tab => {
                  console.log('you clicked the tab', tab.name)
                }}
                className="selectedTab"
              />
            </Box>
          </Grid>
        </Box>
        <Box
          marginTop="1rem"
          marginRight="1rem"
          h="750px"
          boxShadow=" 0px 0px 1px 0px rgba(0, 0, 0, 0.75)"
          w="80%"
          d="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="black" fontSize="3xl">
            Room Informations
          </Text>
        </Box>
      </Grid>
    </div>
  )
}
