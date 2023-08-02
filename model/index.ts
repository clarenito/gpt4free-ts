import {Chat, ChatOptions, ModelType, Site} from "./base";
import {You} from "./you";
import {Mcbbs} from "./mcbbs";
import {ChatDemo} from "./chatdemo";
import {Phind} from "./phind";
import {Forefrontnew} from "./forefront";
import {Vita} from "./vita";
import {Copilot} from "./copilot";
import {Skailar} from "./skailar";
import {FakeOpen} from "./fakeopen";
import {EasyChat} from "./easychat";
import {Better} from "./better";
import {PWeb} from "./pweb";
import {Bai} from "./bai";
import {Gra} from "./gra";
import {Magic} from "./magic";
import {Chim} from "./chim";
import {Poe} from "./poe";
import {Ram} from "./ram";
import {Chur} from "./chur";
import {Xun} from "./xun";
import {VVM} from "./vvm";
import {Poef} from "./poef";
import {Claude} from "./claude";
import {Cursor} from "./cursor";
import {Auto} from "./auto";
import {ChatBase} from "./chatbase";
import {OpenPrompt} from "./openprompt";
import {AILS} from "./ails";
import {Perplexity} from "./perplexity";

export class ChatModelFactory {
    private modelMap: Map<Site, Chat>;
    private readonly options: ChatOptions | undefined;

    constructor(options?: ChatOptions) {
        this.modelMap = new Map();
        this.options = options;
        this.init();
    }

    init() {
        // register new model here
        this.modelMap.set(Site.You, new You(this.options))
        this.modelMap.set(Site.Phind, new Phind(this.options))
        // this.modelMap.set(Site.ForefrontNet, new Forefrontnew({...this.options, net: true}))
        this.modelMap.set(Site.Forefront, new Forefrontnew({...this.options, net: false}))
        this.modelMap.set(Site.Mcbbs, new Mcbbs(this.options))
        this.modelMap.set(Site.ChatDemo, new ChatDemo(this.options))
        this.modelMap.set(Site.Vita, new Vita(this.options))
        this.modelMap.set(Site.Copilot, new Copilot(this.options))
        this.modelMap.set(Site.Skailar, new Skailar(this.options))
        this.modelMap.set(Site.FakeOpen, new FakeOpen(this.options))
        this.modelMap.set(Site.EasyChat, new EasyChat({...this.options, model: ModelType.GPT4}))
        this.modelMap.set(Site.Better, new Better(this.options))
        this.modelMap.set(Site.PWeb, new PWeb(this.options))
        this.modelMap.set(Site.Bai, new Bai(this.options))
        this.modelMap.set(Site.Gra, new Gra(this.options))
        this.modelMap.set(Site.Magic, new Magic(this.options))
        this.modelMap.set(Site.Chim, new Chim(this.options))
        this.modelMap.set(Site.Poe, new Poe(this.options))
        this.modelMap.set(Site.Ram, new Ram(this.options))
        this.modelMap.set(Site.Chur, new Chur(this.options))
        this.modelMap.set(Site.Xun, new Xun(this.options))
        this.modelMap.set(Site.VVM, new VVM(this.options))
        this.modelMap.set(Site.Poef, new Poef(this.options))
        this.modelMap.set(Site.Claude, new Claude(this.options))
        this.modelMap.set(Site.Cursor, new Cursor(this.options))
        this.modelMap.set(Site.Auto, new Auto({...this.options, ModelMap: this.modelMap}))
        this.modelMap.set(Site.ChatBase, new ChatBase(this.options))
        this.modelMap.set(Site.OpenPrompt, new OpenPrompt(this.options))
        this.modelMap.set(Site.AiLs, new AILS(this.options))
        this.modelMap.set(Site.Perplexity, new Perplexity(this.options))
    }

    get(model: Site): Chat | undefined {
        return this.modelMap.get(model);
    }
}
