from flask import Flask, request, render_template, session, redirect, url_for, jsonify
from core.agent_builder.loader import load_meta_agent_and_tools
from core.agent_builder.base import BaseRAGAgentBuilder
from core.param_cache import ParamCache
from core.constants import AGENT_CACHE_DIR
from core.agent_builder.loader import AgentCacheRegistry
from typing import Optional
from flask_session import Session  # You might need to install Flask-Session
from core.utils import construct_agent, RAGParams, load_data, get_image_and_text_nodes, MultimodalChatEngine
# from flask_session import Session
from llama_index.schema import MetadataMode
# from st_utils import (
#     # add_builder_config,
#     get_current_state,
# )

import os 


openai_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
app.config["SECRET_KEY"] = "your_secret_key"
app.config["SESSION_TYPE"] = "filesystem"
# Session(app)
"""Streamlit utils."""
from core.agent_builder.loader import (
    load_meta_agent_and_tools,
    AgentCacheRegistry,
)
from core.agent_builder.base import BaseRAGAgentBuilder
from core.param_cache import ParamCache
from core.constants import (
    AGENT_CACHE_DIR,
)
from typing import Optional, cast
from pydantic import BaseModel

from llama_index.agent.types import BaseAgent
from flask import session


def update_selected_agent_with_id(selected_id: Optional[str] = None) -> None:
    """Update selected agent with id."""
    # set session state
    # st.session_state.selected_id = (
    #     selected_id if selected_id != "Create a new agent" else None
    # )
    session["selected_id"] = (
        selected_id if selected_id != "Create a new agent" else None
    )
    # clear agent builder and builder agent
    session["builder_agent"] = None
    session["agent_builder"] = None

    # clear selected cache
    session["selected_cache"] = None


## handler for sidebar specifically
def update_selected_agent() -> None:
    """Update selected agent."""
    selected_id = session["agent_selector"]
    if selected_id == "Create a new agent":
        return

    update_selected_agent_with_id(selected_id)


def get_cached_is_multimodal() -> bool:
    """Get default multimodal st."""
    if (
        "selected_cache" not in session
        or session["selected_cache"] is None
    ):
        default_val = False
    else:
        selected_cache = cast(ParamCache,session["selected_cache"])
        default_val = True if selected_cache.builder_type == "multimodal" else False
    return default_val


def get_is_multimodal() -> bool:
    """Get is multimodal status."""
    return session.get("is_multimodal_st", False)


# def add_builder_config() -> None:
#     """Add builder config."""
#     with st.expander("Builder Config (Advanced)"):
#         # add a few options - openai api key, and
#         if (
#             "selected_cache" not in st.session_state.keys()
#             or st.session_state.selected_cache is None
#         ):
#             is_locked = False
#         else:
#             is_locked = True

#         st.checkbox(
#             "Enable multimodal search (beta)",
#             key="is_multimodal_st",
#             on_change=update_selected_agent,
#             value=get_cached_is_multimodal(),
#             disabled=is_locked,
#         )


# def add_sidebar() -> None:
#     """Add sidebar."""
#     with st.sidebar:
#         agent_registry = cast(AgentCacheRegistry, st.session_state.agent_registry)
#         st.session_state.cur_agent_ids = agent_registry.get_agent_ids()
#         choices = ["Create a new agent"] + st.session_state.cur_agent_ids

#         # by default, set index to 0. if value is in selected_id, set index to that
#         index = 0
#         if "selected_id" in st.session_state.keys():
#             if st.session_state.selected_id is not None:
#                 index = choices.index(st.session_state.selected_id)
#         # display buttons
#         st.radio(
#             "Agents",
#             choices,
#             index=index,
#             on_change=update_selected_agent,
#             key="agent_selector",
#         )


class CurrentSessionState(BaseModel):
    """Current session state."""

    # arbitrary types
    class Config:
        arbitrary_types_allowed = True

    # agent_registry: AgentCacheRegistry
    selected_id: Optional[str]
    # selected_cache: Optional[ParamCache]
    # agent_builder: BaseRAGAgentBuilder
    cache: ParamCache
    # builder_agent: BaseAgent


def get_current_state() -> CurrentSessionState:
    """Get current state.

    This includes current state stored in session state and derived from it, e.g.
    - agent registry
    - selected agent
    - selected cache
    - agent builder
    - builder agent

    """
    # get agent registry
    agent_registry = AgentCacheRegistry(str(AGENT_CACHE_DIR))
    if 'agent_registry' not in session:
        agent_registry = AgentCacheRegistry(str(AGENT_CACHE_DIR))
        # Assuming you have a way to serialize this for session storage or storing only necessary identifiers
        session['agent_registry'] = agent_registry

    if 'cur_agent_ids' not in session:
        cur_agent_ids = agent_registry.get_agent_ids()
        session['cur_agent_ids'] =  ["legal_assistance_agent", "legal_assistance_agent_v2"]

    if 'selected_id' not in session:
        session['selected_id'] = "legal_assistance_agent_v2"

    # set selected cache if doesn't exist
    if 'selected_cache' not in session or session['selected_cache'] is None:
        if session['selected_id'] is None:
            selected_cache = None
        else:
            agent_cache = agent_registry.get_agent_cache(session['selected_id'])
            # Serialize or store identifier for agent_cache
            session['selected_cache'] = agent_cache
    # else:
    #     # Deserialize or retrieve the ParamCache instance
    #     selected_cache = agent_registry.get_agent_cache(session['selected_cache'])

    # set builder agent / agent builder
    # if (
    #     "builder_agent" not in st.session_state.keys()
    #     or st.session_state.builder_agent is None
    #     or "agent_builder" not in st.session_state.keys()
    #     or st.session_state.agent_builder is None
    # ):
    #     if (
    #         "selected_cache" in st.session_state.keys()
    #         and st.session_state.selected_cache is not None
    #     ):
    #         # create builder agent / tools from selected cache
    #         builder_agent, agent_builder = load_meta_agent_and_tools(
    #             cache=st.session_state.selected_cache,
    #             agent_registry=st.session_state.agent_registry,
    #             # NOTE: we will probably generalize this later into different
    #             # builder configs
    #             is_multimodal=get_cached_is_multimodal(),
    #         )
    #     else:
    #         # create builder agent / tools from new cache
    #         builder_agent, agent_builder = load_meta_agent_and_tools(
    #             agent_registry=st.session_state.agent_registry,
    #             is_multimodal=get_is_multimodal(),
    #         )

    #     st.session_state.builder_agent = builder_agent
    #     st.session_state.agent_builder = agent_builder

    current_state = CurrentSessionState(
        # agent_registry=session['agent_registry'],
        selected_id="legal_assistance_agent_v2",
        cache = ParamCache.load_from_disk(str("cache/agents/legal_assistance_agent_v2")),
        # selected_cache=session['selected_cache'],
        # agent_builder=None,
        # builder_agent=None,
        # # Include other fields as needed, handling complex objects appropriately
    )
    return current_state
# Assuming the adaptation of core functionality to be usable outside Streamlit
# from your_core_logic import process_user_input, initialize_agent, get_agent_response



cache = ParamCache.load_from_disk(str("cache/agents/legal_assistance_agent_v2"))
agent = load_meta_agent_and_tools(cache=cache, agent_registry=AgentCacheRegistry(str(AGENT_CACHE_DIR)))


@app.route("/", methods=["GET"])
def home():
    # current_state = get_current_state()
    # cache = ParamCache.load_from_disk(str(r"cache\agents\legal_assistance_agent_v2"))
    # response = agent.chat("hello")

    # response = cache.agent.chat("ipc section 25A")
    # text_nodes = get_image_and_text_nodes(response.source_nodes)
    # # index = cache.vector_index 
    # # qe= index.as_query_engine()
    # # response = qe.query("give me the ")
    # return jsonify({"response": response, "text_nodes": text_nodes})
    # if "messages" not in session:
    #     session["messages"] = [{"role": "assistant", "content": "What RAG bot do you want to build?"}]
    
    # if request.method == "POST":
    #     user_input = request.form.get("user_input")
    #     if user_input:  # Add user input to session messages
    #         session["messages"].append({"role": "user", "content": user_input})
            
    #         # Process the input and get a response (pseudo-code, adapt as necessary)
    #         # response = current_state.agent_registry.get_agent_caches()[0].process(user_input)  # Implement this function based on your logic
    #         session["messages"].append({"role": "assistant", "content": response})
            
    #         return redirect(url_for("home"))
    
    return render_template("index.html")

@app.route('/compare')
def compare():
    return render_template('destination.html')

@app.route("/chat", methods=["POST"])
def chat():
    if "agent_messages" not in session:
        session["agent_messages"] = [{"role": "assistant", "content": "Ask me a question!"}]
    
    # if request.method == "POST":
    user_input = request.json.get("user_input")
    response = cache.agent.chat(str(user_input))
    text_nodes = get_image_and_text_nodes(response.source_nodes)
    sourcelist = []
    for textnode in text_nodes:
        for node in textnode:
            sourcelist.append(node.get_content( metadata_mode=MetadataMode.ALL))
            print(node)

    return jsonify({"response": str(response), "text_nodes": sourcelist})


@app.route("/chat", methods=["GET"])
def get_chat():
    if "agent_messages" not in session:
        session["agent_messages"] = [{"role": "assistant", "content": "Ask me a question!"}]
    
        
        
    return render_template("chat.html", messages=session["agent_messages"])

# Additional routes and logic as needed...

# if __name__ == "__main__":
#     app.run(debug=True)
