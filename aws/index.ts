import * as AWS from 'aws-sdk'

async function assumeRole(roleArn: string) {
  const sts = new AWS.STS()

  try {
    const data = await sts
      .assumeRole({
        RoleArn: roleArn,
        RoleSessionName: 'CloudFlowSession',
      })
      .promise()

    console.log('Temporary credentials obtained:', data)

    // Configure AWS SDK with temporary credentials
    const ec2 = new AWS.EC2({
      accessKeyId: data.Credentials?.AccessKeyId,
      secretAccessKey: data.Credentials?.SecretAccessKey,
      sessionToken: data.Credentials?.SessionToken,
      region: 'us-east-2', // Specify the region
    })

    return ec2
  } catch (err) {
    console.error('Error assuming role:', err)
    throw err
  }
}

async function createInstance(ec2: AWS.EC2) {
  const params = {
    ImageId: 'ami-06744fbd0847bf4f5',
    InstanceType: 't2.micro',
    MinCount: 1,
    MaxCount: 1,
  }

  try {
    const result = await ec2.runInstances(params).promise()
    console.log('EC2 instance created:', result.Instances?.[0]?.InstanceId)
  } catch (err) {
    console.error('Error creating instance:', err)
  }
}

;(async () => {
  const roleArn = 'arn:aws:iam::892442544241:role/CloudFlowRole' // Replace with your role ARN
  const ec2 = await assumeRole(roleArn)
  await createInstance(ec2)
})()
