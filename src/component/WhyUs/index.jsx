import React from 'react'
import './whyus.style.css'
import whyusimg1 from '../../assets/herosvg.svg'
import whyusimg2 from '../../assets/wedding.svg'
import whyusimg3 from '../../assets/eating.svg'
import rangoliImg from '../../assets/rangoli.png'
import WhyusColumn from './whyusColumn'
const WhyUs = () => {
  return (
    <section className='whyus'>
      <div className='container'>
        <img src={rangoliImg} alt='rangoli' className='whyusRangoli' />
        <h3 className='sectionHeading whyusheading'>Why Us?</h3>
        <div className='whyusContainer'>
          <WhyusColumn img={whyusimg1} title='Historical Background'>
            The original name of the village is Saurashtra. The name derives
            from its status as a cultural and intellectual center of the
            Saurashtra region, associated with Janaka, the ancient king of
            Mithila. Janaka is mentioned in the Ramayana stories as the father
            of the Maithili Princess Sita. Tradition has it that the marriage of
            Janaka's daughter, Sita, took place in this village. The presiding
            God of this village is Somanath or Shiva. According to tradition, in
            AD 1025, Mahmud of Ghazni attacked the temple of Somnath, completely
            destroying it. It is believed that Lord Somnath appeared in the
            dream of the two Maithil Brahman brothers, Bhagirath Dutta Sharma
            and Ganga Dutt Sharma, and asked them to take His Lingam away. The
            two brothers, following God's instruction, went to Dwarka, brought
            the lingam to the village and kept it there in hiding for a long
            time. Later the lingam was duly enshrined. The Somanath temple at
            Dwarka is situated in the Saurashtra region. In the 18th century, a
            Maithil king constructed here the temple of Somnath.This story is
            mentioned in the introductory chapter of the official District
            Gazetteer of Darbhanga (1964, when Madhubani district was part of
            Darbhanga) by Roy Choudhary. The main landowners of the village are
            the Thakurs family. The Thakurs are Maithil Brahmins who owned most
            of the land in the village and held the official marriage records,
            as well as records of family trees. Later in the 17th century, when
            the house of Thakurs was set on fire by outsiders, they transferred
            the records of families to other Shishyas, who now look after the
            marriage registration and are known as Panjipara. In the 18th
            century, a deputy commissioner stole 300 acres of land from the
            Thakurs, after taking fingerprints from Ravinrdra nath Tagore after
            his death. His son, Laxminarayan Thakur, established the
            Laxminarayan Palace, which is situated near the Mahatma Taposhtal
            and Gayatri Mandir. The Gayatri Mandir was established by
            Laxminarayan's younger brother, Purushottam Thakur, who was referred
            to as Mahatma. Today the Thakurs live in Nepal, Bangladesh, and
            various other parts of India.
          </WhyusColumn>
          <WhyusColumn img={whyusimg2} title='Why SaurathSabha.com'>
            Saurath Sabha is a historical village situated approximately 6km
            northeast of Madhubani in the Madhubani District of Bihar,India. It
            is famous for its annual gathering of thousands of maithil Brahman
            to match couples during the Hindu months of Jyestha-Aasadh. The
            gathering is organised in an orchard covering 22 acres (bighas) of
            land, which are said to have been donated by the Maharaja of
            Darbhanga. It is an important social event in India that is focused
            on arranged marriages between Maithil men and women according to a
            reading of their lineage history by the registrars (Panjikars). The
            King of Mithila, Harisingh Deva (1310–1324), introduced the practice
            of keeping genealogical records Panji in the Mithila region. This
            practice was carried out by the Brahmins and Kayasthas. This was
            considered a major social reform at the time and was reinforced
            through royal patronage. It was proposed that to facilitate
            marriages and curb practices associated with arranged marriages, the
            father of the bride should be allowed to meet the father and
            prospective groom so that the marriage could be arranged in front of
            everyone. The Maharaja of Mithila approved this idea and 14 villages
            were selected to hold these events, known as sabhas: Saurath,
            Khanagadi, Partapur, Sheohar, Govindpur, Fattepur, Sajhaul,
            Sukhasana, Akhdari, Hemnagar, Balua, Baruali, Samsaul, and Sahsaula.
            While Saurath maintains the tradition, all other villages have
            discontinued this practice.
          </WhyusColumn>
          <WhyusColumn img={whyusimg3} title='Tradition of Saurath Sabha'>
            Almost every year, during the suddha - favourable days for the
            arrangement of marriages - thousands of Maithil Brahmins gather at
            Sabha Gaachchi in Saurath. The Panjikaran, who
            the Panji genealogical records, plays an important role in arranging
            marriages; it is compulsory for every individual seeking marriage to
            receive an asvajajanapatra certificate from the Panjikaran, stating
            that there is no "blood relationship" between the bride and groom.
            There is a fixed place – dera – for every village in the Sabha. The
            timing and number of days are decided during a meeting between the
            scholars and pandits of Mithila in accordance with the traditional
            astrological almanac, Pachanga. The Sabha usually lasts for seven to
            fifteen days and is held once or twice a year during the most
            favourable months. After reaching the dera the father or guardian of
            the bride begins searching for a suitable groom with the help of his
            relatives and a ghatak (middleman). The negotiation takes place in a
            democratic manner and is held in the open. The grooms and their
            parents also arrive at their respective deras However, women are not
            allowed in the Saurath Sabha.
          </WhyusColumn>
        </div>
      </div>
    </section>
  )
}

export default WhyUs
