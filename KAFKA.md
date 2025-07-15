1. Create a Topic
```
    kafka-topics.sh --create --topic <topic-name> --bootstrap-server <kafka-broker> --partitions <num-partitions> --replication-factor <replication-factor>
```
2. List All Topics
```
    kafka-topics.sh --list --bootstrap-server <kafka-broker>
```
3. Describe a Topic
```
    kafka-topics.sh --describe --topic <topic-name> --bootstrap-server <kafka-broker>
```
4. Alter a Topic
```
    kafka-topics.sh --alter --topic <topic-name> --bootstrap-server <kafka-broker> --config <key>=<value>
```
5. Delete a Topic
```
    kafka-topics.sh --delete --topic <topic-name> --bootstrap-server <kafka-broker>
```
6. Produce Messages to a Topic
```
    kafka-console-producer.sh --broker-list <kafka-broker> --topic <topic-name>
```
7. Consume Messages from a Topic
```
    kafka-console-consumer.sh --bootstrap-server <kafka-broker> --topic <topic-name> --from-beginning
```
8. Consume Messages with a Specific Consumer Group
```
    kafka-console-consumer.sh --bootstrap-server <kafka-broker> --topic <topic-name> --group <consumer-group> --from-beginning
```
9. Get Offsets for a Consumer Group
```
    kafka-consumer-groups.sh --bootstrap-server <kafka-broker> --describe --group <consumer-group>
```
10. Reset Offsets for a Consumer Group
```
    kafka-consumer-groups.sh --bootstrap-server <kafka-broker> --group <consumer-group> --reset-offsets --topic <topic-name> --to-earliest --execute
```
11. Check Kafka Broker Health
```
    kafka-broker-api-versions.sh --bootstrap-server <kafka-broker>
```
12. View Log Directory Information
```
    kafka-log-dirs.sh --bootstrap-server <kafka-broker> --describe --dir <log-dir>
```
13. Monitor Consumer Lag
```
    kafka-consumer-groups.sh --bootstrap-server <kafka-broker> --describe --group <consumer-group>
```
14. Create a Topic with Specific Configurations
```
    kafka-topics.sh --create --topic <topic-name> --bootstrap-server <kafka-broker> --partitions <num-partitions> --replication-factor <replication-factor> --config retention.ms=3600000
```
15. Check Broker Information
```
    kafka-broker-api-versions.sh --bootstrap-server <kafka-broker>
```