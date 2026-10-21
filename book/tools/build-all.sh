#!/bin/sh
# الكتاب كله في ملف واحد: المقدمة، فالقضايا، فأعلام التكوين، فالأعلام المهمون، فالوجوه، فثبت المصادر
set -e
cd "$(dirname "$0")/../.."
S=book/src
TOPICS="$S/al-sahra.txt $S/ayyam-al-arab.txt $S/al-muallaqat.txt $S/al-nathr.txt $S/al-intihal.txt"
POETS="$S/imru-al-qais.txt $S/tarafa.txt $S/zuhayr.txt $S/al-nabigha.txt $S/al-asha.txt $S/antara.txt $S/labid.txt $S/al-khansa.txt"
FIGURES="$S/aws-ibn-hajar.txt $S/al-muhalhil.txt $S/umayya.txt $S/amr-ibn-kulthum.txt $S/harith-ibn-hilliza.txt $S/abid-ibn-al-abras.txt $S/alqama.txt $S/adi-ibn-zayd.txt $S/bishr-ibn-abi-khazim.txt $S/durayd-ibn-al-simma.txt $S/al-shanfara.txt $S/taabbata-sharran.txt $S/urwa-ibn-al-ward.txt $S/hatim.txt"
FACES=""
for g in awail hukama muammarun fursan asra saalik ushshaq ritha hira hunafa hudhayl wahida amthal khayl karam; do FACES="$FACES $S/group-$g.txt"; done
python3 book/tools/thabt.py $S/muqaddima.txt $TOPICS $POETS $FIGURES $FACES
python3 book/tools/render.py --out jahili \
  "العصر الجاهلي · المقدمة" $S/muqaddima.txt \
  "العصر الجاهلي · قضايا العصر" $TOPICS \
  "العصر الجاهلي · أعلام التكوين" $POETS \
  "العصر الجاهلي · الأعلام المهمون" $FIGURES \
  "العصر الجاهلي · وجوه من العصر" $FACES \
  "العصر الجاهلي · ثبت المصادر والمراجع" $S/thabt.txt
node book/tools/build.mjs "$PWD/book" jahili "$@"
cp book/out/jahili.pdf "book/out/العصر-الجاهلي.pdf"
