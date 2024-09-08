<template>
    <div class="content-wrapper">
        <div class="banners">
            <UCarousel v-slot="{ item }" :items="carouselItems" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden" style="width: 924px" arrows>
                <img :src="item" class="carousel-img" draggable="false">
            </UCarousel>
            <div class="red-banner">
                <div class="red-banner__text">  
                    МЕЖДУНАРОДНАЯ выставка - форум
                </div>
                <div class="red-banner__button" @click="isMapModalOpen = true">
                    Скачать карту
                </div>
            </div>
        </div>
        <div class="block-wrapper">
            <div class="block-title">
                Афиша событий
            </div>
            <div class="calendar-wrapper">
                <Swiper
                    :height="100"
                    :slides-per-view="5"
                    :modules="[SwiperEffectCreative]"
                    :loop="false"
                    
                    :creative-effect="{
                        prev: {
                        shadow: false,
                        translate: ['-20%', 0, -1]
                        },
                        next: {
                        translate: ['100%', 0, 0]
                        }
                    }"
                >
                    <SwiperSlide
                        v-for="(slide, index) in dates"
                        :key="index"
                        class="slide-wrapper"
                    >
                        <div v-if="slide.day == '01' || slide.today" class="slide-month">
                            {{ slide.month }}
                        </div>
                        <div class="slide">
                            <div class="slide-weekday">
                                {{ slide.weekday }}
                            </div>
                            <div class="slide-day">
                                {{ slide.day }}
                            </div>
                            
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <div class="block-wrapper">
            <div class="block-title">
                Информация
            </div>
            <div class="information-wrapper">
                <div class="information-accordion">
                    <div class="information-accordion__label">
                        Для посетителей форума
                    </div>
                    <UAccordion 
                        :items="infoItems" 
                        multiple
                        size="lg"
                        color="gray"
                        open-icon="i-heroicons-plus"
                        close-icon="i-heroicons-minus"
                        class="accordion-main"
                    />
                </div>
                <div class="information-banner">
                    <img src="/faq.png" alt="инфо-баннер" class="information-banner__img">
                </div>
            </div>
        </div>
        <div class="block-wrapper">
            <div class="block-title">
                Участники
            </div>
            <div class="filters-wrapper">
                <div 
                    v-for="(item, index) in filters" 
                    :key="index">
                    <div 
                        :class="item.value == currentFilter.value ? 'filter filter__active' : 'filter'" 
                        @click="setFilter(item)">
                        {{ item.label }}
                    </div> 
                </div>
            </div>
            <div class="members-wrapper">
                <a
                    v-for="(item, index) in currentMembers"
                    :key="index"
                    :class="item.wide ? 'member member-wide' : 'member'"
                    :href="`${item.link}`" 
                    target="_blank">
                    <div class="member__type">{{ item.typeRepr }}</div>
                    <div class="member__name">{{ item.name }}</div>
                    <img :src="item.img" alt="изображение участника" class="member__img">
                </a>
            </div>
        </div>
    </div>

    <UModal v-model="isMapModalOpen" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow'
          }
        }"
      >
        <template #header>
          <div class="flex items-center justify-end">
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isMapModalOpen = false" />
          </div>
        </template>
      </UCard>
      <img src="/map.png" alt="карта">
    </UModal>
</template>

<script>
import { useMainStore } from '@/stores/main';
import { ref, computed, onMounted, watch } from 'vue';

export default {
    setup() {
        const store = useMainStore();
        const dates = ref([]);
        const currentFilter = ref({
            label: 'Все',
            value: 'all'
        },);
        const currentMembers = ref([]);
        const isMapModalOpen = ref(false);

        const filters = [
            {
                label: 'Все',
                value: 'all'
            },
            {
                label: 'Органы власти',
                value: 'authority'
            },
            {
                label: 'Корпорации',
                value: 'corp'
            },
            {
                label: 'Регионы',
                value: 'regions'
            },
            {
                label: 'Другие',
                value: 'other'
            },
        ]

        const infoItems = [
            {
                label: 'Время работы',
                content: 'Выставка открыта для всех посетителей с 4 ноября 2023 года по 8 июля 2024 года. Вторник — четверг с 10:00 до 21:00. Пятница — воскресенье с 10:00 до 22:00. Понедельник — выходной день.',
            },
            {
                label: 'Кто принимает участие в выставке-форуме?',
                content: 'В международной выставке-форуме «Россия» принимают участие 89 регионов, 22 федеральных органа исполнительной власти (министерства, а также Федеральное агентство по государственным резервам), 20 компаний, корпораций и общественных организаций, в том числе «Движение первых», «Россия — страна возможностей», Российское общество «Знание» — всего 131 экспозиция.',
            },
            {
                label: 'Как попасть на Выставку?',
                content: 'Посещение Выставки бесплатное. На отдельные мероприятия требуется регистрация на официальном сайте Выставки.',
            },
            {
                label: 'Транспортный режим на ВДНХ',
                content: 'Во время Международной выставки-форума «Россия» самый оптимальный способ добраться до ВДНХ и путешествовать по территории — общественный транспорт. 1) Ближайшие станции метро — «ВДНХ» и «Ботанический сад» (от этих станций через всю территорию Выставки туда и обратно следует маршрут №533). 2) Увеличено количество бесплатных микроавтобусов, которые курсируют по Кольцевой дороге ВДНХ. Маршрутный транспорт доставит гостей к объектам выставки-форума «Россия». 3) В «Москвариум» удобнее всего доехать на бесплатном маршрутном такси, которое следует от метро «ВДНХ» к павильону. Такси. Ближайшая к территории ВДНХ остановка находится у павильона «Рабочий и колхозница», в двух минутах ходьбы до арки Главного входа и в пешей доступности от павильона №75. Личный транспорт. Для автовладельцев работает многоуровневая парковка по адресу Хованская улица, 18, в непосредственной близости от КПП «Хованский».',
            },
            {
                label: 'Какие предметы запрещены к проносу на территорию и объекты выставки-форума?',
                content: '— Взрывчатые вещества и их компоненты, средства взрывания и предметы, ими начиненные. — Оружие любого типа, в том числе самообороны, боеприпасы, составные части огнестрельного оружия, а также спецсредства. — Колющие или режущие предметы, ножи, иное холодное оружие, а также иные предметы, которые могут быть использованы в качестве оружия. — Устройства и изделия, в том числе самодельного изготовления, не являющиеся пиротехникой, применяющиеся для разбрасывания, распыления различных материалов и веществ (в том числе пневмохлопушки), и иные вещества, изделия, предметы, в том числе самодельного изготовления, использование которых может привести к травмам, воспламенению или задымлению. — Любые предметы, внешне напоминающие запрещённые предметы или их копии и аналоги. — Средства маскировки или предметы, затрудняющие установление личности, за исключением средств индивидуальной защиты органов дыхания (маски, респираторы). — Аэрозольные баллончики, сжатые и сжиженные газы, за исключением карманных зажигалок, косметических средств (туалетная вода, духи и т. п.). — Огнеопасные и пиротехнические вещества или изделия, включая сигнальные ракеты, файеры, петарды, газовые баллоны и предметы (химические материалы), которые могут быть использованы для изготовления пиротехнических изделий или дымов. — Воспламеняющиеся твердые вещества, а также легковоспламеняющиеся и горючие жидкости, горючие газы. — Окисляющие вещества и органические перекиси. — Токсичные вещества, радиоактивные материалы и коррозирующие вещества. — Ядовитые, отравляющие и едко пахнущие вещества. — Материалы экстремистского, оскорбительного или дискриминационного характера, содержащие нацистскую атрибутику или символику, либо атрибутику или символику экстремистских организаций, или направленные на дискриминацию любого рода против страны, лица или группы лиц по признаку расы, цвета кожи, этнического, национального или социального происхождения и статуса, по месту рождения, финансовому состоянию или иного статуса, пола, инвалидности, языка, религии, политических или иных убеждений, или по любой другой причине, включая баннеры, флаги, символику и атрибутику, листовки, одежду, но не ограничиваясь ими. — Средства защиты тела: бронежилеты, корсеты (кроме обусловленных медицинскими показаниями). — Наркотические, психотропные, токсические вещества, их прекурсоры, в том числе в виде лекарственных средств, а также медицинские шприцы и иглы для инъекций, за исключением инъекционных препаратов, медицинских шприцов и игл при предъявлении медицинских документов на необходимость их использования. — Стеклянные и металлические контейнеры, бутылки и банки,за исключением прозрачных пластиковых контейнеров для пищевых продуктов объемом до 1,5 л, емкостей с косметическими средствами. — Жидкости в емкостях более 500 мл. — Алкогольные напитки. — Любые животные, за исключением собак-проводников с ветеринарным паспортом на животное. — Громоздкие предметы, сумма трех измерений которых по длине, ширине и высоте превышает 150 см. — Флаги и баннеры, размеры которых превышают 2x1,5 м. — Древки для флагов или плакатов любого типа. — Рекламные материалы любого рода, печатная продукция религиозного, политического или оскорбительного содержания, или содержания, противоречащего общественному порядку и/или морали (в том числе баннеры, транспаранты, плакаты, вывески и их аналоги). — Технические средства, способные помешать проведению мероприятий Форума. — Беспилотные воздушные суда любой максимальной взлетной массы и беспилотные аппараты, перемещающиеся по земле, на воде и под водой, воздушные змеи. — Профессиональное оборудование для фото- и видеосъемки, за исключением оборудования аккредитованных представителей СМИ. — Любые сыпучие вещества независимо от объема, за исключением разрешенных лекарственных препаратов. — Другие вещества и предметы, представляющие опасность, а также запрещенные к обороту на территории Российской Федерации. — Средства индивидуальной мобильности (электросамокаты, гироскутеры и т. д.).',
            },
        ];

        const carouselItems = [ '/slides/1.png', '/slides/2.png' ];
        
        const today = computed(() => new Date());

        const members = computed(() => store.members.array);

        const setFilter = async (item) => {
            if(item.value == 'all') {
                currentMembers.value = await members.value;
                currentFilter.value = item;
            } else {
                let newMembers = await members.value.filter((member) => member.type == item.value);
                currentMembers.value = newMembers;
                currentFilter.value = item;
            }
        }

        onMounted(async () => {
            for (let i = 0; i < 30; i++) {
                const date = new Date();
                const nextDate = new Date(date.setDate(date.getDate() + i));
                dates.value.push({day: nextDate.toLocaleDateString('ru-Ru', { 
                    day: '2-digit',
                }), 
                weekday: nextDate.toLocaleDateString('ru-Ru', { 
                    weekday: 'short',
                }), 
                month: nextDate.toLocaleDateString('ru-Ru', {
                    month: 'long'
                }),
                raw: nextDate , today: i == 0 });
            }

            await store.getMembers();

            currentMembers.value = members.value;
        });

        return {
            store,
            dates,
            today,
            infoItems,
            currentFilter,
            filters,
            setFilter,
            members,
            currentMembers,
            isMapModalOpen,
            carouselItems,
        };
        
    },
}
</script>

<style lang="scss" scoped>
    .content-wrapper {
        display: flex;
        gap: 32px;
        flex-direction: column;
    }

    .banners {
        background-color: white;
        border-radius: 18px;
        padding: 16px;
        display: flex;
        gap: 26px;
        justify-content: space-between;;
    }

    .red-banner {
        height: 424px;
        border-radius: 16px;
        background: url('/big_back.png');
        background-position: center left;
        background-repeat: no-repeat;
        background-size: cover;
        padding: 25px 16px;
        width: 27%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-transform: uppercase;

        &__text {
            color: white;
            font-size: 20px;
            font-weight: 500;
            line-height: 24px;
            
        }

        &__button {
            color: #D3112B;
            border-radius: 16px;
            padding: 6px 12px;
            background-color: white;
            font-size: 16px;
            text-align: center;
            line-height: 26px;
        }
    }

    .block-wrapper {
        display: flex;
        padding: 35px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 25px;
        align-self: stretch;
        border-radius: 16px;
        background: #FFF;
    }

    .block-title {
        color: #414141;
        font-size: 35px;
        font-style: normal;
        font-weight: 700;
        line-height: 35px;
    }

    .calendar-wrapper {
        display: flex;
        flex-direction: column;
        gap: 25px;
        width: 100%;
        overflow: hidden;
    }

    .slide {
        border-radius: 16px;
        padding: 16px 22px 16px 22px;
        background-color: #f5f5f5;
        text-align: center;
        transition: background-color .3s ease-in-out;
        cursor: pointer;  
        width: auto;
        height: auto;
        padding: 16px 22px;
        display: flex;    
        flex-direction: column;
    }

    .slide-wrapper {
        width: 70px !important;
        height: 95px;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        margin-right: 10px;
    }

    .slide-month {
        height: 25px;
    }

    .slide-weekday {
        font-size: 10px;
        color: #05050573;
        text-transform: uppercase;
    }

    .slide-day {
        color: #414141;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 1;
        margin-top: 10px;
    }

    .information-wrapper {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .information-banner {
        width: 600px;

        &__img {
            width: 100%;
            border-radius: 16px;
        }
    }

    .information-accordion {
        width: 50%;
        padding: 16px;

        &__label {
            color: #414141;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: 35px;
            margin-bottom: 24px;
        }
    }

    .accordion-main {
        gap: 24px;
    }

    .accordion-main :deep(button) {
        padding: 16px;
        margin-bottom: 0;
        font-size: 18px;
        color: #262627;
        font-weight: 500;
        line-height: 120%;

        span {
            overflow: visible;
            display: flex;
        }
    }

    .filter {
        padding: 10px 12px;
        border-radius: 16px;
        border: 1px solid rgba(211, 17, 43, 0.40);
        font-size: 16px;
        font-style: normal;
        font-weight: 450;
        line-height: 18px;
        padding-top: 12px;
        cursor: pointer;
    }

    .filter__active {
        color: #FFF;
        background: #CE1531;
    }

    .filters-wrapper {
        display: flex;
        gap: 8px;
    }

    .members-wrapper {
        display: flex;
        gap: 24px;
        flex-wrap: wrap;
    }

    .member {
        padding: 16px;
        border-radius: 16px;
        background-color: #FAFAFA;
        width: 22%;
        display: flex;
        text-decoration: none;
        flex-direction: column;

        &__type {
            margin-bottom: 24px;
            color:#D3112B;
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
            letter-spacing: 0.44px;
            text-transform: uppercase;
        }

        &__name {
            color: #262627;
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: 120%;
            margin-bottom: 24px;
        }

        &__img {
            width: 100%;
            object-fit: cover;
            transition: transform 0.8s ease-in-out;
            border-radius: 16px;
        }
    }

    .member-wide {
        width: 48%;
    }

    .carousel-img {
        border-radius: 16px;
        height: 424px;
        object-fit: cover;
    }
</style>