$.verbose = false

const ipScanning = async ({ ipPrefix, scanStartPort, scanEndPort }) => {
  if (!ipPrefix || !scanStartPort || !scanEndPort) return

  const list = []

  for (let i = scanStartPort; i < scanEndPort; i++) {
    const ip = `${ipPrefix}${i}`

    console.info(`ping: ${ip}`)

    try {
      const res = await $`ping -t 1 -c 1 ${ip}`
      if (res.stdout.includes('round-trip min/avg/max/stddev')) {
        list.push(res.stdout)
      }
    } catch (error) {}
  }

  console.log(`success: ${list.length}`)

  list.forEach(item => {
    console.log(item.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i)?.[0])
  })

  return list
}

const config = {
  ipPrefix: `58.23.20.`,
  scanStartPort: 0,
  scanEndPort: 256,
}

ipScanning(config)
