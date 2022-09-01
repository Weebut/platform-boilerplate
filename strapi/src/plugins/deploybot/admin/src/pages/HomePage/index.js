/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import Pencil from '@strapi/icons/Pencil';
import { Typography } from '@strapi/design-system/Typography';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { Box } from '@strapi/design-system/Box';
import Calendar from '@strapi/icons/Calendar';
import { Layout, BaseHeaderLayout } from '@strapi/design-system/Layout';
import { Button } from '@strapi/design-system/Button';
import Plus from '@strapi/icons/Plus';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';

import DeploymentApiHandler from '../../api/deploy';

function HomePage() {
  const [ModalVisible, SetModalVisible] = React.useState(false);
  const [ErrorVisible, SetErrorVisible] = React.useState(false);
  const [errMessage, SetErrMessage] = React.useState('');
  const [deploymentList, setDeployment] = React.useState([]);
  const [isRedeploy, setIsRedeploy] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [redeployedVal, setRedeployVal] = React.useState({});

  async function FetchDeployments() {
    const deployments = await DeploymentApiHandler.getAllDeployments();
    setDeployment(deployments);
  }

  async function reDeployment(id) {
    try {
      await DeploymentApiHandler.reDeployment(id);
    } catch (err) {
      SetErrorVisible(true);
      SetErrMessage('진행중인 배포가 이미 있습니다.');
    }
    FetchDeployments();
  }

  async function addDeployment() {
    try {
      await DeploymentApiHandler.addDeployment();
    } catch (err) {
      SetErrorVisible(true);
      SetErrMessage('진행중인 배포가 이미 있습니다.');
    }
    FetchDeployments();
  }

  React.useEffect(() => {
    FetchDeployments();
  }, []);

  return (
    <Box>
      <Layout>
        <Box background="neutral100">
          <BaseHeaderLayout
            primaryAction={
              <Button startIcon={<Plus />} onClick={SetModalVisible}>
                Deploy New Database
              </Button>
            }
            title="Deploy Database"
            subtitle={'현재 보이는 테이블 필드를 적용합니다'}
            as="h2"
          ></BaseHeaderLayout>
        </Box>
        {deploymentList.length == 0 ? (
          <Box padding={8} background="neutral100">
            <EmptyStateLayout
              icon={<Calendar />}
              content="You don't have any deployments yet..."
            />
          </Box>
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">ID</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">생성된 시간</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">연결된 배포 ID</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">상태</Typography>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {deploymentList.map((k) => {
                return (
                  <Tr>
                    <Td>
                      <Typography textColor="neutral800">{k.id}</Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">{k.name}</Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">{k.parent}</Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">{k.status}</Typography>
                    </Td>
                    <Flex>
                      <IconButton
                        onClick={() => {
                          setRedeployVal({
                            id: k.id,
                          });
                          setIsRedeploy(true);
                        }}
                        label="Redeploy"
                        noBorder
                        icon={<Pencil />}
                      />
                    </Flex>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </Layout>
      {ModalVisible && (
        <ModalLayout
          onClose={() => SetModalVisible((prev) => !prev)}
          labelledBy="배포하기"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              배포하기
            </Typography>
          </ModalHeader>
          {!isLoading ? (
            <>
              <ModalBody>
                <Box padding={8} background="neutral100">
                  정말 배포하시겠습니까?
                </Box>
              </ModalBody>
              <ModalFooter
                startActions={
                  <Button
                    onClick={() => SetModalVisible((prev) => !prev)}
                    variant="tertiary"
                  >
                    아니오
                  </Button>
                }
                endActions={
                  <>
                    <Button
                      onClick={async () => {
                        setLoading(true);
                        await addDeployment();
                        SetModalVisible((prev) => !prev);
                        setLoading(false);
                      }}
                    >
                      네
                    </Button>
                  </>
                }
              />
            </>
          ) : (
            <ModalBody>
              <Box key={`box`} padding={8} background="neutral100">
                배포 요청중입니다
              </Box>
            </ModalBody>
          )}
        </ModalLayout>
      )}
      {isRedeploy && (
        <ModalLayout
          onClose={() => setIsRedeploy((prev) => !prev)}
          labelledBy="배포 롤백"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              배포 롤백
            </Typography>
          </ModalHeader>
          {!isLoading ? (
            <>
              <ModalBody>
                <Box key={`box`} padding={8} background="neutral100">
                  정말 다시 배포하시겠습니까?
                </Box>
              </ModalBody>
              <ModalFooter
                startActions={
                  <Button
                    onClick={() => setIsRedeploy((prev) => !prev)}
                    variant="tertiary"
                  >
                    아니오
                  </Button>
                }
                endActions={
                  <>
                    <Button
                      onClick={async () => {
                        setLoading(true);
                        await reDeployment(redeployedVal.id);
                        setIsRedeploy((prev) => !prev);
                        setLoading(false);
                      }}
                    >
                      네
                    </Button>
                  </>
                }
              />
            </>
          ) : (
            <ModalBody>
              <Box key={`box`} padding={8} background="neutral100">
                배포 요청중입니다
              </Box>
            </ModalBody>
          )}
        </ModalLayout>
      )}
      {ErrorVisible && (
        <ModalLayout
          onClose={() => SetErrorVisible((prev) => !prev)}
          labelledBy="오류 발생"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              오류 발생
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Box key={`box`} padding={8} background="neutral100">
              {errMessage}
            </Box>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button
                onClick={() => SetErrorVisible((prev) => !prev)}
                variant="tertiary"
              >
                돌아가기
              </Button>
            }
          />
        </ModalLayout>
      )}
    </Box>
  );
}
export default memo(HomePage);
