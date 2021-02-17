import React, { useState } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { Button } from '@chakra-ui/button'
import { Box, Divider, Flex } from '@chakra-ui/layout'

import MessageDetails from '../components/MessageDetails'
import MessagesList from '../components/MessagesList'
import NewMessageForm from '../components/NewMessageForm'

type FolderName = 'Inbox' | 'Sent'

interface ITabLinkProps {
  folderName: FolderName
  link: string
  activeFolder: FolderName | null
  changeActiveFolder: (folder: FolderName) => void
}

const TabLink: React.FC<ITabLinkProps> = ({
  folderName,
  link,
  activeFolder,
  changeActiveFolder,
}: ITabLinkProps) => {
  return (
    <Link to={link}>
      <Box
        mr='4'
        px='2'
        py='1'
        onClick={() => {
          changeActiveFolder(folderName)
        }}
        style={
          folderName === activeFolder ? { borderTop: '2px solid green' } : {}
        }
      >
        {folderName}
      </Box>
    </Link>
  )
}

const MessagesPage: React.FC = () => {
  const [activeFolder, setActiveFolder] = useState<FolderName | null>('Inbox')
  let { path, url } = useRouteMatch()

  return (
    <Router>
      <Flex justifyContent='space-between' w='100%' mt='4' mb='1'>
        <Flex>
          <TabLink
            folderName='Inbox'
            link={`${url}/inbox`}
            activeFolder={activeFolder}
            changeActiveFolder={setActiveFolder}
          />
          <TabLink
            folderName='Sent'
            link={`${url}/sent`}
            activeFolder={activeFolder}
            changeActiveFolder={setActiveFolder}
          />
        </Flex>
        <Link to={`${url}/compose`}>
          <Button
            size='sm'
            colorScheme='green'
            onClick={() => setActiveFolder(null)}
          >
            Compose
          </Button>
        </Link>
      </Flex>
      <Divider />
      <Switch>
        <Route path={`${path}/compose`} component={NewMessageForm} />
        <Route path={`${path}/:folder/:id`} component={MessageDetails} />
        <Route path={`${path}/:folder`} component={MessagesList} />
        <Redirect exact from={path} to={`${url}/inbox`} />
      </Switch>
    </Router>
  )
}

export default MessagesPage
