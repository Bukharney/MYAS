package utils

import "log"

func LogWithPrefix(prefix, message string) {
	oldPrefix := log.Prefix()
	log.SetPrefix(prefix)
	log.Println(message)
	log.SetPrefix(oldPrefix)
}
